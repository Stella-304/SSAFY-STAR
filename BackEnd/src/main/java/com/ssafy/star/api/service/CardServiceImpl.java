package com.ssafy.star.api.service;

import com.ssafy.star.common.auth.enumeration.GroupFlagEnum;
import com.ssafy.star.common.db.dto.request.CardRegistReqDto;
import com.ssafy.star.common.db.dto.request.CardUpdateReqDto;
import com.ssafy.star.common.db.dto.request.SearchConditionReqDto;
import com.ssafy.star.common.db.dto.response.CardDetailDto;
import com.ssafy.star.common.db.dto.response.ConstellationListDto;
import com.ssafy.star.common.db.dto.response.EdgeDto;
import com.ssafy.star.common.db.dto.response.GroupInfoDto;
import com.ssafy.star.common.db.entity.Card;
import com.ssafy.star.common.db.entity.Polygon;
import com.ssafy.star.common.db.entity.User;
import com.ssafy.star.common.db.repository.CardRepository;
import com.ssafy.star.common.db.repository.CompanyRepository;
import com.ssafy.star.common.db.repository.CoordinateRepository;
import com.ssafy.star.common.db.repository.PolygonRepository;
import com.ssafy.star.common.db.repository.UserRepository;
import com.ssafy.star.common.exception.CommonApiException;
import com.ssafy.star.common.provider.AuthProvider;
import com.ssafy.star.common.util.CalcUtil;
import com.ssafy.star.common.util.CallAPIUtil;
import com.ssafy.star.common.util.GeometryUtil;
import com.ssafy.star.common.util.ParsingUtil;
import com.ssafy.star.common.util.constant.CommonErrorCode;
import com.ssafy.star.constellation.Icosphere;
import com.ssafy.star.constellation.Icosphere2;
import com.ssafy.star.constellation.Icosphere3;
import com.ssafy.star.constellation.Point3D;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Queue;
import java.util.Random;
import java.util.Set;
import java.util.Stack;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import javax.swing.*;

@Log4j2
@Service
@RequiredArgsConstructor
public class CardServiceImpl implements CardService {

	private final UserRepository userRepository;
	private final CompanyRepository companyRepository;
	private final CardRepository cardRepository;
	private final CoordinateRepository coordinateRepository;
	private final AuthProvider authProvider;
	private final PolygonRepository polygonRepository;

	// 반구의 반지름
	private final int RADIUS = 100;
	// Polygon Matrix의 행,열의 크기
	private final int SIZE = 91;
	// private final int[] startYList = {30, 30, 30, 30, 40, 40, 40, 40, 50, 50, 50, 50, 60, 60, 60, 60};
	// private final int[] startXList = {30, 40, 50, 60, 30, 40, 50, 60, 30, 40, 50, 60, 30, 40, 50, 60};
	private final int[] dy = {1, -1, 0, 0};
	private final int[] dx = {0, 0, 1, -1};

	// section의 크기
	private final int SECTION_SIZE = 32;
	// 최대로 들어갈수 있는 개수
	private final int PER_SECTION_CNT = 105;
	// 섹션 몇개가 모이면 큰 섹션이 되지?
	private final int NEED_MAKE_LARGE_SECTION_CNT = 4;
	private final Random random = new Random();

	@Override
	@Transactional
	public String updateBojTier() {
		long userId = authProvider.getUserIdFromPrincipal();

		User user = userRepository.findById(userId)
			.orElseThrow(() -> new CommonApiException(CommonErrorCode.USER_NOT_FOUND));

		Card card = Optional.ofNullable(user.getCard())
			.orElseThrow(() -> new CommonApiException(CommonErrorCode.NO_CARD_PROVIDED));

		String bojId = Optional.ofNullable(card.getBojId())
			.orElseThrow(() -> new CommonApiException(CommonErrorCode.NO_BOJ_ID_PROVIDED));

		String tier = CallAPIUtil.getUserTier(bojId);
		card.updateBojTier(tier);

		return tier;
	}

	@Override
	public String getBojTier(String bojId) {
		return CallAPIUtil.getUserTier(bojId);
	}

	@Override
	public List<String> searchCompany(String query) {
		return companyRepository.searchCompanyList(query);
	}

	@Override
	public ConstellationListDto getCardList() {
		List<Card> cardList = cardRepository.getAllCardListWithUser();

		List<CardDetailDto> cardDetailDtoList = setCoordinates(cardList);
		cardDetailDtoList.sort(new Comparator<CardDetailDto>() {
			@Override
			public int compare(CardDetailDto o1, CardDetailDto o2) {
				if (!o1.getGeneration().equals(o2.getGeneration()))
					return o1.getGeneration().compareTo(o2.getGeneration());
				if (!o1.getCampus().equals(o2.getCampus())) {
					List<String> temp = Arrays.asList(new String[] {"서울", "대전", "광주", "구미", "부울경"});
					int i1 = temp.indexOf(o1.getCampus());
					int i2 = temp.indexOf(o2.getCampus());
					return i1 - i2;
				}
				if (!o1.getName().equals(o2.getName()))
					return o1.getName().compareTo(o2.getName());
				// if (!o1.getBan().equals(o2.getBan()))
				// 	return o1.getBan().compareTo(o2.getBan());
				return o1.getBan().compareTo(o2.getBan());

			}
		});
		List<EdgeDto> edgeDtoList = GeometryUtil.getEdgeList2(cardDetailDtoList);
		ConstellationListDto constellationListDto = new ConstellationListDto(cardDetailDtoList, edgeDtoList);

		return constellationListDto;
	}

	private List<CardDetailDto> setCoordinates(List<Card> cardList) {

		int r = 100;
		List<Point3D> coordinateList = Icosphere3.vertices;
		int cardCnt = cardList.size();
		int vertices = coordinateList.size();
		List<Integer> numbers = new ArrayList<>();
		for (int i = 0; i < vertices; i++) {
			numbers.add(i);
		}
		List<Integer> result = new ArrayList<>();
		Random random = new Random();
		for (int i = 0; i < cardCnt; i++) {
			int index = random.nextInt(numbers.size());
			result.add(numbers.remove(index));

		}

		List<CardDetailDto> detailDtoList = new ArrayList<>();

		long userId = -1L;

		try {
			userId = authProvider.getUserIdFromPrincipal();
		} catch (Exception e) {
		}

		for (int i = 0; i < cardCnt; i++) {
			int selected = result.get(i);
			Card curCard = cardList.get(i);
			detailDtoList.add(new CardDetailDto(curCard, r * coordinateList.get(selected).getX()
				, r * coordinateList.get(selected).getY(), r * coordinateList.get(selected).getZ(),
				curCard.getUser().getId().longValue() == userId
			));
		}
		return detailDtoList;
	}

	@Override
	@Transactional
	public void registCard(CardRegistReqDto cardRegistReqDto) {
		long userId = authProvider.getUserIdFromPrincipal();
		User user = userRepository.findById(userId)
			.orElseThrow(() -> new CommonApiException(CommonErrorCode.USER_NOT_FOUND));
		if (user.getCard() != null) {
			throw new CommonApiException(CommonErrorCode.ALEADY_EXIST_CARD);
		}
		user.setName(cardRegistReqDto.getName());
		Card card = cardRegistReqDto.of(user);
		cardRepository.save(card);
		user.setCard(card);
	}

	@Override
	@Transactional
	public void updateCard(CardUpdateReqDto cardUpdateReqDto) throws Exception {
		long userId = authProvider.getUserIdFromPrincipal();

		User user = userRepository.findById(userId)
			.orElseThrow(() -> new CommonApiException(CommonErrorCode.USER_NOT_FOUND));

		Card card = Optional.ofNullable(user.getCard())
			.orElseThrow(() -> new CommonApiException(CommonErrorCode.NO_CARD_PROVIDED));
		user.setName(cardUpdateReqDto.getName());
		card.of(cardUpdateReqDto);
	}

	@Override
	public CardDetailDto getMyCard() {
		long userId = authProvider.getUserIdFromPrincipal();

		User user = userRepository.findById(userId)
			.orElseThrow(() -> new CommonApiException(CommonErrorCode.USER_NOT_FOUND));

		Card card = Optional.ofNullable(user.getCard())
			.orElseThrow(() -> new CommonApiException(CommonErrorCode.NO_CARD_PROVIDED));
		CardDetailDto cardDetailDto = new CardDetailDto(card, 0, 0, 0, true);
		return cardDetailDto;
	}

	// 찐 최종본. 모듈화 생략하고 여기에 일단 다 담을거임. ㅅㄱ
	// @Override
	public TempDto getCardListUsePolygon(List<Card> cardList, GroupFlagEnum groupFlag, long userId,
		Map<String, List<Card>> cardGroupMap) {

		double MULTIPLIER = 0.0;
		if (groupFlag == GroupFlagEnum.DETAIL) {
			MULTIPLIER = 1.5;
		} else if (cardList.size() > 1000) {
			MULTIPLIER = 1.5;
		} else if (cardList.size() > 500) {
			MULTIPLIER = 2.5;
		} else if (cardList.size() > 300) {
			MULTIPLIER = 4.5;
		} else if (cardList.size() > 150) {
			MULTIPLIER = 6.0;
		} else {
			MULTIPLIER = 10.0;
		}

		// 반구의 반지름
		List<Polygon> polygonList = polygonRepository.findAll();

		List<CardDetailDto> cardDetailDtoList = new ArrayList<>();
		List<EdgeDto> edgeDtoList = new ArrayList<>();
		List<EdgeDto> contourList = new ArrayList<>();

		// 1차원 polygionList를 2차원 polygonMatrix로 변경.
		Polygon[][] polygonMatrix = new Polygon[SIZE][SIZE];
		List<Integer> temp = new LinkedList<>();
		for (int i = 0; i < SIZE; i++) {
			for (int j = 0; j < SIZE; j++) {
				if (polygonList.get(i * SIZE + j).getX() != null && polygonList.get(i * SIZE + j).getZ() >= 0.03) {
					polygonMatrix[i][j] = polygonList.get(i * SIZE + j);
					if (i == 45 && j == 45)
						continue;
					temp.add(i * SIZE + j);
				}
			}
		}

		Collections.shuffle(temp);
		temp.add(0, 45 * 91 + 45);
		// System.out.println("polygon!!");
		// System.out.println(temp);

		List<String> keyList = cardGroupMap.keySet().stream()
			.sorted(Comparator.comparing(x -> cardGroupMap.get(x).size()).reversed())
			.collect(Collectors.toList());
		int groupSize = keyList.size();

		Set<Integer> visited = new HashSet<>();
		List<GroupInfoDto> groupInfoDtoList = new ArrayList<>();
		for (int i = 0; i < groupSize; i++) {
			String key = keyList.remove(0);
			if (key.equals("Unknown"))
				continue;
			int startPos = -1;
			while (!temp.isEmpty()) {
				startPos = temp.remove(0);
				if (!visited.contains(startPos))
					break;
			}

			if (startPos == -1)
				throw new CommonApiException(CommonErrorCode.FAIL_TO_MAKE_CONSTELLATION);

			Polygon polygon = polygonList.get(startPos);

			// x,y,z에 표시할 그룹 이름
			groupInfoDtoList.add(
				GroupInfoDto
					.builder()
					.groupName(ParsingUtil.getGroupName(groupFlag, key))
					.x(polygon.getX() * RADIUS)
					.y(polygon.getZ() * RADIUS)
					.z(polygon.getY() * RADIUS)
					.build());

			// x,y,z를 중심으로 그룹 내의 모든 카드를 배치
			List<Card> curGroupCardList = cardGroupMap.get(key);

			int willChooseCardCnt = curGroupCardList.size();
			// System.out.println(willChooseCardCnt);
			Queue<int[]> queue = new ArrayDeque<>();
			List<int[]> choosePosList = new ArrayList<>();
			queue.add(new int[] {startPos / SIZE, startPos % SIZE});
			visited.add(startPos);

			while (!queue.isEmpty() && choosePosList.size() < willChooseCardCnt * MULTIPLIER) {
				int[] cur = queue.poll();
				choosePosList.add(cur);
				int cy = cur[0];
				int cx = cur[1];
				for (int k = 0; k < 4; k++) {
					int ny = cy + dy[k];
					int nx = cx + dx[k];
					int nCur = ny * SIZE + nx;
					if (0 <= ny && ny < SIZE && 0 <= nx && nx < SIZE && polygonMatrix[ny][nx] != null
						&& !visited.contains(nCur)) {
						queue.add(new int[] {ny, nx});
						visited.add(nCur);
					}
				}
			}

			if (choosePosList.size() < curGroupCardList.size()) {
				// System.out.println("Cant batch");
				// throw new CommonApiException(CommonErrorCode.FAIL_TO_MAKE_CONSTELLATION);
				continue;
			}
			Collections.shuffle(choosePosList);

			List<CardDetailDto> curGroupCardDetailDtoList = new ArrayList<>();
			List<EdgeDto> curGroupEdgeDtoList;
			List<EdgeDto> curGropContourList;
			for (int j = 0; j < willChooseCardCnt; j++) {
				Card card = curGroupCardList.get(j);
				int[] choocePos = choosePosList.get(j);
				int idx = choocePos[0] * SIZE + choocePos[1];
				polygon = polygonList.get(idx);
				int y = idx / SIZE;
				int x = idx % SIZE;

				double myX = polygon.getX();
				double myY = polygon.getY();
				double myZ = polygon.getZ();
				double minX = polygon.getX();
				double minY = polygon.getY();
				double minZ = polygon.getZ();
				double maxX = polygon.getX();
				double maxY = polygon.getY();
				double maxZ = polygon.getZ();

				for (int k = 0; k < 4; k++) {
					int ny = y + dy[k];
					int nx = x + dx[k];
					if (0 <= ny && ny < SIZE && 0 <= nx && nx < SIZE) {
						Polygon tempPolygon = polygonList.get(ny * SIZE + nx);
						if (tempPolygon.getX() == null)
							continue;
						minX = Math.min(minX, (tempPolygon.getX() + myX * 3) / 4);
						minY = Math.min(minY, (tempPolygon.getY() + myY * 3) / 4);
						minZ = Math.min(minZ, (tempPolygon.getZ() + myZ * 3) / 4);
						maxX = Math.max(maxX, (tempPolygon.getX() + myX * 3) / 4);
						maxY = Math.max(maxY, (tempPolygon.getY() + myY * 3) / 4);
						maxZ = Math.max(maxZ, (tempPolygon.getZ() + myZ * 3) / 4);
					}
				}

				double finalX = random.nextDouble() * (maxX - minX) + minX;
				double finalY = random.nextDouble() * (maxY - minY) + minY;
				double finalZ = random.nextDouble() * (maxZ - minZ) + minZ;
				curGroupCardDetailDtoList.add(
					new CardDetailDto(card, finalX * RADIUS, finalZ * RADIUS, finalY * RADIUS,
						card.getUser().getId().longValue() == userId));
			}

			// 외곽선 따기
			curGropContourList = getContour(curGroupCardDetailDtoList);
			// MST
			curGroupEdgeDtoList = GeometryUtil.getEdgeList(curGroupCardDetailDtoList);

			// 각 그룹에 대한 정보들을 저장.
			cardDetailDtoList.addAll(curGroupCardDetailDtoList);
			edgeDtoList.addAll(curGroupEdgeDtoList);
			contourList.addAll(curGropContourList);
		}
		return new TempDto(cardDetailDtoList, contourList, edgeDtoList, groupInfoDtoList);

	}

	public TempDto getCardListForFirst(GroupFlagEnum groupFlag, long userId,
		Map<String, List<Card>> cardGroupMap) {

		List<Card> cardList = cardGroupMap.get("ssafy");

		List<CardDetailDto> cardDetailDtoList = setCoordinates(cardList);
		cardDetailDtoList.sort(new Comparator<CardDetailDto>() {
			@Override
			public int compare(CardDetailDto o1, CardDetailDto o2) {
				if (!o1.getGeneration().equals(o2.getGeneration()))
					return o1.getGeneration().compareTo(o2.getGeneration());
				if (!o1.getCampus().equals(o2.getCampus())) {
					List<String> temp = Arrays.asList(new String[] {"서울", "대전", "광주", "구미", "부울경"});
					int i1 = temp.indexOf(o1.getCampus());
					int i2 = temp.indexOf(o2.getCampus());
					return i1 - i2;
				}
				if (!o1.getName().equals(o2.getName()))
					return o1.getName().compareTo(o2.getName());
				return o1.getBan().compareTo(o2.getBan());

			}
		});
		List<EdgeDto> edgeDtoList = GeometryUtil.getEdgeList2(cardDetailDtoList);
		List<GroupInfoDto> groupInfoDtoList = new ArrayList<>();
		groupInfoDtoList.add(GroupInfoDto.builder().x(0).y(0).z(0).groupName("").build());
		System.out.println("FIRST!!!");
		return new TempDto(cardDetailDtoList, new ArrayList<>(), edgeDtoList, groupInfoDtoList);

	}

	static CardDetailDto first = null;

	public List<EdgeDto> getContour(List<CardDetailDto> curGroupCardDetailDtoList) {
		// 일단 컨투어 안나오게 함.
		if (true)
			return new ArrayList<>();
		// 컨벡스헐을 이용해서 볼록껍질을 찾자.
		// 나머지 점들은 이어주자.
		// 점들 중, x좌표값이나, y좌표값이 가장 작은 점을 기준점으로 잡는다
		int firstIdx = 0;
		first = curGroupCardDetailDtoList.get(0);
		for (int i = 1; i < curGroupCardDetailDtoList.size(); i++) {
			if (curGroupCardDetailDtoList.get(i).getX() < first.getX()) {
				first = curGroupCardDetailDtoList.get(i);
				firstIdx = i;
			} else if (curGroupCardDetailDtoList.get(i).getZ() == first.getZ()) {
				if (curGroupCardDetailDtoList.get(i).getX() < first.getX()) {
					first = curGroupCardDetailDtoList.get(i);
					firstIdx = i;
				}
			}
		}

		// 기준점과 나머지 점들이 ccw로 반시계방향(좌회전)이 되도록 정렬을 시키고, 만약 일직선상에 있으면 거리가 증가하게끔 정렬한다.
		curGroupCardDetailDtoList.sort(new Comparator<CardDetailDto>() {
			@Override
			public int compare(CardDetailDto second, CardDetailDto third) {
				int ccwR = CalcUtil.ccw(first, second, third);
				if (ccwR > 0) // 반시계
					return -1; // 오름차순
				else if (ccwR < 0)
					return 1; // 내림차순
				double distR1 = Math.round(CalcUtil.dist(first, second) * 10000) / 10000.0;
				double distR2 = Math.round(CalcUtil.dist(first, third) * 10000) / 10000.0;

				if (distR1 >= distR2)
					return 1;
				else {
					return -1;
				}
			}
		});

		// 그라함 스캔 알고리즘
		Stack<CardDetailDto> stack = new Stack<CardDetailDto>();
		Stack<Integer> useIdx = new Stack<>();
		boolean[] visited = new boolean[curGroupCardDetailDtoList.size()];
		stack.add(first);
		useIdx.add(firstIdx);
		for (
			int i = 1; i < curGroupCardDetailDtoList.size(); i++) {
			// 시계방향이면 제거한다.
			while (stack.size() > 1
				&&
				CalcUtil.ccw(stack.get(stack.size() - 2), stack.get(stack.size() - 1), curGroupCardDetailDtoList.get(i))
					<= 0) {
				stack.pop();
				useIdx.pop();
			}
			stack.add(curGroupCardDetailDtoList.get(i));
			useIdx.add(i);
		}
		List<EdgeDto> curGroupEdgeDtoList = new ArrayList<>();

		for (int i = 0; i < stack.size(); i++) {
			curGroupEdgeDtoList.add(new EdgeDto(stack.get(i), stack.get((i + 1) % stack.size())));
			visited[useIdx.pop()] = true;
		}
		// System.out.println(curGroupEdgeDtoList);
		// System.out.println(Arrays.toString(visited));
		return curGroupEdgeDtoList;
	}

	@Getter
	class TempDto {
		List<CardDetailDto> cardDetailDtoList;
		List<EdgeDto> contourList;
		List<EdgeDto> edgeDtoList;
		List<GroupInfoDto> groupInfoDtoList;

		public TempDto(List<CardDetailDto> cardDetailDtoList,
			List<EdgeDto> contourList, List<EdgeDto> edgeDtoList,
			List<GroupInfoDto> groupInfoDtoList) {
			this.cardDetailDtoList = cardDetailDtoList;
			this.contourList = contourList;
			this.edgeDtoList = edgeDtoList;
			this.groupInfoDtoList = groupInfoDtoList;
		}
	}

	@Override
	public ConstellationListDto getCardListV2(SearchConditionReqDto searchConditionReqDto) {
		// 컨투어 안나오게 함.
		List<Card> cardList = cardRepository.searchBySearchCondition(searchConditionReqDto);

		GroupFlagEnum groupFlag;
		if (searchConditionReqDto.getGroupFlag().equals("")) {
			groupFlag = GroupFlagEnum.NONE;
		} else {
			try {
				groupFlag = GroupFlagEnum.valueOf(searchConditionReqDto.getGroupFlag().toUpperCase());
			} catch (Exception e) {
				throw new CommonApiException(CommonErrorCode.FAIL_TO_PARSE);
			}
		}

		// 로그인한 유저의 아이디.
		long userId = authProvider.getUserIdFromPrincipalDefault();
		Map<String, List<Card>> cardGroupMap = cardList.stream()
			.collect(Collectors.groupingBy(x -> x.getGroupFlag(groupFlag)));

		TempDto tempDto = null;
		// 먼저 coordinate로 시도

		if (cardList.size() < 200 && cardGroupMap.keySet().size() < 32 && groupFlag != GroupFlagEnum.DETAIL) {
			try {
				tempDto = getCardListUseCoordinate(cardList, groupFlag, userId, cardGroupMap);
			} catch (CommonApiException e) {
			}
		}
		// 안되면 polygon으로 변경
		if (tempDto == null) {
			tempDto = getCardListUsePolygon(cardList, groupFlag, userId, cardGroupMap);
		}

		List<CardDetailDto> cardDetailDtoList = tempDto.getCardDetailDtoList();
		List<EdgeDto> edgeDtoList = tempDto.getEdgeDtoList();
		List<GroupInfoDto> groupInfoDtoList = tempDto.getGroupInfoDtoList();

		if (groupFlag == GroupFlagEnum.NONE && searchConditionReqDto.ofFilterName().equals("전체")) {
			// cardDetailDtoList = setCoordinates(cardList);
			edgeDtoList = GeometryUtil.getEdgeList2(cardDetailDtoList);
			groupInfoDtoList = new ArrayList<>();
		}

		cardDetailDtoList.sort(new Comparator<CardDetailDto>() {
			@Override
			public int compare(CardDetailDto o1, CardDetailDto o2) {
				if (!o1.getGeneration().equals(o2.getGeneration()))
					return o1.getGeneration().compareTo(o2.getGeneration());
				if (!o1.getCampus().equals(o2.getCampus())) {
					List<String> temp = Arrays.asList(new String[] {"서울", "대전", "광주", "구미", "부울경"});
					int i1 = temp.indexOf(o1.getCampus());
					int i2 = temp.indexOf(o2.getCampus());
					return i1 - i2;
				}
				if (!o1.getName().equals(o2.getName()))
					return o1.getName().compareTo(o2.getName());
				// if (!o1.getBan().equals(o2.getBan()))
				// 	return o1.getBan().compareTo(o2.getBan());
				return o1.getBan().compareTo(o2.getBan());

			}
		});

		// 외곽선 포함해도 되고 안해도 됨.
		// edgeDtoList.addAll(tempDto.getContourList());

		return new ConstellationListDto(cardDetailDtoList, edgeDtoList, groupInfoDtoList,
			searchConditionReqDto.ofFilterName());
	}

	public TempDto getCardListUseCoordinate(List<Card> cardList, GroupFlagEnum groupFlag, long userId,
		Map<String, List<Card>> cardGroupMap) {

		// TempDto를 만들기 위해 필요한 친구들.
		List<CardDetailDto> cardDetailDtoList = new ArrayList<>();
		List<GroupInfoDto> groupInfoDtoList = new ArrayList<>();
		List<EdgeDto> edgeDtoList = new ArrayList<>();
		List<EdgeDto> contourList = new ArrayList<>();

		////////////////////////////////////////////////////////////////////////////

		int totalGroupSize = cardGroupMap.keySet().size();

		// 어떤 이유로든, 만들어진 그룹이 32개가 넘어가면 에러.
		if (totalGroupSize > SECTION_SIZE)
			throw new CommonApiException(CommonErrorCode.FAIL_TO_MAKE_CONSTELLATION);

		boolean[] visited = new boolean[SECTION_SIZE];
		//
		// List<Integer> randomIdxList = IntStream.rangeClosed(0, SECTION_SIZE - 1)
		// 	.boxed()
		// 	.collect(Collectors.toList());

		List<Integer> willShuffleList = new ArrayList<>();
		List<Integer> firstIdx = new ArrayList<>();
		for (int i = 0; i < 32; i++) {
			if (i >= 12 && i <= 15)
				firstIdx.add(i);
			else
				willShuffleList.add(i);
		}

		Collections.shuffle(willShuffleList);
		List<Integer> randomIdxList = new ArrayList<>();
		randomIdxList.addAll(firstIdx);
		randomIdxList.addAll(willShuffleList);
		// System.out.println("coordinate!!");
		// System.out.println(randomIdxList);
		// 작은 섹션이라면 (섹션번호 + 1), 큰 섹션이라면 (-섹션번호) 를 저장해주자.
		Map<String, Integer> allocatedSectionsMap = new HashMap<>();

		for (String key : cardGroupMap.keySet()) {
			if (key.equals("Unknown"))
				continue;
			List<Card> curGroupList = cardGroupMap.get(key);
			int curGroupListCnt = curGroupList.size();

			// 섹션을 최대 4개까지 묶었는데도, 그룹에 속한 별자리가 많으면 에러.
			if (curGroupListCnt > PER_SECTION_CNT * 4)
				throw new CommonApiException(CommonErrorCode.FAIL_TO_MAKE_CONSTELLATION);

			// 섹션의 1/5 이상이 채워진다면, 섹션 네개를 모아주자.
			if (curGroupListCnt * 5 > PER_SECTION_CNT) {
				// 연속 네개 모을수 있는 시작 인덱스.
				List<Integer> canPutList = new ArrayList<>();
				for (int i = 0; i < SECTION_SIZE / NEED_MAKE_LARGE_SECTION_CNT; i++) {
					boolean isCanPut = true;
					for (int j = 0; j < NEED_MAKE_LARGE_SECTION_CNT; j++) {
						if (visited[i * NEED_MAKE_LARGE_SECTION_CNT + j]) {
							isCanPut = false;
							break;
						}
					}

					// 네개 연속해서 놓을수 있으면, 시작 인덱스를 넣어주자
					if (isCanPut)
						canPutList.add(i);

				}

				// 놓을수 있는 공간이 하나도 없으면 에러.
				if (canPutList.isEmpty())
					throw new CommonApiException(CommonErrorCode.FAIL_TO_MAKE_CONSTELLATION);
				int canPutStartIdx;
				// 섞고 나서 첫번째 인덱스 Get.
				if (canPutList.contains(2)) {
					canPutStartIdx = 2;
				} else if (canPutList.contains(3)) {
					canPutStartIdx = 3;
				} else {
					Collections.shuffle(canPutList);
					canPutStartIdx = canPutList.get(0);
				}

				// 일단 방문처리 하고 할당한 섹션의 정보들을 넣어주자
				// List<Integer> allocatedLargeSection = new ArrayList<>();
				for (int j = 0; j < NEED_MAKE_LARGE_SECTION_CNT; j++) {
					visited[canPutStartIdx * 4 + j] = true;
					// allocatedLargeSection.add(canPutStartIdx + j);
				}
				allocatedSectionsMap.put(key, -canPutStartIdx);

			} else {
				// 충분히 작아서 한 섹션에 들어가도 된다면.
				while (true) {
					// 하나 뽑고.
					int peek = randomIdxList.remove(0);

					// 방문 안한 원소를 뽑을때까지 무!한!반!복!
					if (!visited[peek]) {
						visited[peek] = true;
						allocatedSectionsMap.put(key, peek + 1);
						break;
					}
				}
			}
		}

		// {대전=6, 서울=8, 부울경=7, 구미=27, 광주=30}
		// {Unrated=-16, Gold1=1}
		// 여기까지 왔으면 위와 같은 데이터들이 allocatedSectionMap에 들어있다.

		List<EdgeDto> contour = new ArrayList<>();
		for (String key : allocatedSectionsMap.keySet()) {
			List<Card> curCardGroupList = cardGroupMap.get(key);
			int curCardGroupCnt = curCardGroupList.size();
			int allocatedSectionIdx = allocatedSectionsMap.get(key);

			List<Point3D> shuffledPointList = null;

			// 작은 섹션일때
			if (allocatedSectionIdx > 0) {
				allocatedSectionIdx -= 1;
				shuffledPointList = new ArrayList<>(Icosphere.list_32.get(allocatedSectionIdx));
			} else {
				// 큰 섹션일때
				allocatedSectionIdx *= -1;
				shuffledPointList = new ArrayList<>(Icosphere2.list_8.get(allocatedSectionIdx));
			}

			Collections.shuffle(shuffledPointList);
			List<CardDetailDto> curGroupCardDetailDtoList = new ArrayList<>();
			List<EdgeDto> curGroupEdgeDtoList = new ArrayList<>();
			double centerX = 0;
			double centerY = 0;
			double centerZ = 0;

			for (int i = 0; i < curCardGroupCnt; i++) {
				Point3D curPoint = shuffledPointList.get(i);
				Card curCard = curCardGroupList.get(i);
				CardDetailDto dto = new CardDetailDto(curCard, curPoint.getX() * RADIUS, curPoint.getZ() * RADIUS,
					curPoint.getY() * RADIUS,
					curCard.getUser().getId().longValue() == userId);
				curGroupCardDetailDtoList.add(dto);
				centerX += curPoint.getX();
				centerY += curPoint.getY();
				centerZ += curPoint.getZ();
			}

			groupInfoDtoList.add(
				GroupInfoDto
					.builder()
					.groupName(ParsingUtil.getGroupName(groupFlag, key))
					.x(centerX * RADIUS / curCardGroupCnt)
					.y(centerZ * RADIUS / curCardGroupCnt)
					.z(centerY * RADIUS / curCardGroupCnt)
					.build());

			// 외곽선 따기
			contour = getContour(curGroupCardDetailDtoList);
			// MST
			curGroupEdgeDtoList = GeometryUtil.getEdgeList(curGroupCardDetailDtoList);

			// 각 그룹별로 다 추가해주기
			cardDetailDtoList.addAll(curGroupCardDetailDtoList);
			edgeDtoList.addAll(curGroupEdgeDtoList);
			contourList.addAll(contour);
		}
		return new TempDto(cardDetailDtoList, contourList, edgeDtoList, groupInfoDtoList);
	}
}
