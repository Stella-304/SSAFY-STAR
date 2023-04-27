package com.ssafy.star.api.service;

import java.util.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.star.common.db.dto.request.CardRegistReqDto;
import com.ssafy.star.common.db.dto.request.CardUpdateReqDto;
import com.ssafy.star.common.db.dto.request.SearchConditionReqDto;
import com.ssafy.star.common.db.dto.response.CardDetailDto;
import com.ssafy.star.common.db.dto.response.ConstellationListDto;
import com.ssafy.star.common.db.dto.response.EdgeDto;
import com.ssafy.star.common.db.entity.Card;
import com.ssafy.star.common.db.entity.Coordinate;
import com.ssafy.star.common.db.entity.User;
import com.ssafy.star.common.db.repository.CardRepository;
import com.ssafy.star.common.db.repository.CompanyRepository;
import com.ssafy.star.common.db.repository.CoordinateRepository;
import com.ssafy.star.common.db.repository.UserRepository;
import com.ssafy.star.common.exception.CommonApiException;
import com.ssafy.star.common.provider.AuthProvider;
import com.ssafy.star.common.util.CallAPIUtil;
import com.ssafy.star.common.util.GeometryUtil;
import com.ssafy.star.common.util.constant.CommonErrorCode;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CardServiceImpl implements CardService {

	final UserRepository userRepository;
	final CompanyRepository companyRepository;
	final CardRepository cardRepository;
	final CoordinateRepository coordinateRepository;
	final AuthProvider authProvider;

	@Override
	@Transactional
	public void updateBojTier() {
		long userId = authProvider.getUserIdFromPrincipal();

		User user = userRepository.findById(userId)
			.orElseThrow(() -> new CommonApiException(CommonErrorCode.USER_NOT_FOUND));

		Card card = Optional.ofNullable(user.getCard())
			.orElseThrow(() -> new CommonApiException(CommonErrorCode.NO_CARD_PROVIDED));

		String bojId = Optional.ofNullable(card.getBojId())
			.orElseThrow(() -> new CommonApiException(CommonErrorCode.NO_BOJ_ID_PROVIDED));

		String tier = CallAPIUtil.getUserTier(bojId);
		card.updateBojTier(tier);
	}

	@Override
	public String getBojTier(String bojId) {
		return CallAPIUtil.getUserTier(bojId);
	}

	@Override
	public ConstellationListDto getCardList(SearchConditionReqDto searchConditionReqDto) {
		List<Card> cardList = new ArrayList<>();
		boolean isCelestial = false;
//		if (searchConditionReqDto == null) {
//			cardList = cardRepository.getAllCardListWithUser();
//			isCelestial = true;
//		} else {
//			//Query DSL 써서 구현 후순위
//		}
		//일단은 이걸로 하자
		cardList = cardRepository.getAllCardListWithUser();
		isCelestial = true;
		List<EdgeDto> edgeDtoList = hi(cardList);
		List<CardDetailDto> detailDtoList = setCoordinates(cardList, isCelestial);
		return new ConstellationListDto(detailDtoList, edgeDtoList);
	}

	public List<CardDetailDto> setCoordinates(List<Card> cardList, boolean isCelestial) {
		int cardCnt = cardList.size();
		//기본 천구
		int level ;
		int r ;
		level=GeometryUtil.getLevelFromCardCnt(cardCnt);
		r=GeometryUtil.getRadiusFromLevel(level);
		if (isCelestial) {
			level=6;
			r=20;
		}
		int vertices = GeometryUtil.getVerticesFromLevel(level);
		//나중에 최적화 합시다 .랜덤하게 뿌리는거.
		// 일단 지금은 while문을 도는데 이것보다는 for문을 확실하게 돌게끔. n번 뽑게끔하자. 그리고 list에서 삭제시키는 방법으로 수정을 합시다.
//		boolean[] isSeleceted = new boolean[vertices];
//		Stack<Integer> selectedCoordinatesStk = new Stack<>();
//		int pick;
//		for (int i = 0; i < cardCnt; i++) {
//			while (true) {
//				pick = (int)(Math.random() * vertices);
//				if (!isSeleceted[pick]) {
//					isSeleceted[pick] = true;
//					selectedCoordinatesStk.add(pick);
//					break;
//				}
//			}
//		}
		List<Integer> numbers=new ArrayList<>();
		for(int i=0;i<vertices;i++){
			numbers.add(i);
		}
		List<Integer> result = new ArrayList<Integer>();
		Random random = new Random();
		for(int i=0;i<cardCnt;i++){
			int index = random.nextInt(numbers.size());
			result.add(numbers.remove(index));
		}


		//level별 coordinate limit 걸기
		List<Coordinate> coordinateList = new ArrayList<>();
		if (level == 1) {
			coordinateList = coordinateRepository.findTop12ByOrderByIdDesc();
		} else if (level == 2) {
			coordinateList = coordinateRepository.findTop42ByOrderByIdDesc();
		} else if (level == 3) {
			coordinateList = coordinateRepository.findTop162ByOrderByIdDesc();
		} else if (level == 4) {
			coordinateList = coordinateRepository.findTop642ByOrderByIdDesc();
		} else if (level == 5) {
			coordinateList = coordinateRepository.findTop2562ByOrderByIdDesc();
		} else {
			coordinateList = coordinateRepository.findAll();
		}
		List<CardDetailDto> detailDtoList = new ArrayList<>();
		for (int i = 0; i < cardCnt; i++) {
//			int selected = selectedCoordinatesStk.pop();
			int selected= result.get(i);
			detailDtoList.add(new CardDetailDto(cardList.get(i), r * coordinateList.get(selected).getX(),
				r * coordinateList.get(selected).getY(), r * coordinateList.get(selected).getZ()));
		}
		return detailDtoList;
	}

	//상학쓰 구현파트
	public List<EdgeDto> hi(List<Card> cardList) {
		return null;
	}

	@Override
	public List<String> searchCompany(String query) {
		companyRepository.searchCompanyList(query).stream().forEach(System.out::println);
		return companyRepository.searchCompanyList(query);
	}

	@Override
	public void registCard(CardRegistReqDto cardRegistReqDto) {
		System.out.println("여기들어왔냐고..");
		Card card=cardRegistReqDto.of();
		cardRepository.save(card);
		long userId=authProvider.getUserIdFromPrincipal();
		User user=userRepository.findById(userId).orElseThrow(() -> new CommonApiException(CommonErrorCode.USER_NOT_FOUND));
		user.setCard(card);
	}

	@Override
	@Transactional
	public void updateCard(CardUpdateReqDto cardUpdateReqDto) throws Exception {
		Card card = cardRepository.findById(cardUpdateReqDto.getId()).orElseThrow(() -> new Exception());
		//이부분에서 cardUpdateReqDto 값중 하나라도 null이 들어오면 500에러가 뜬다. 어떻게 해결?

		Optional.of(cardUpdateReqDto.getContent()).ifPresent(x -> card.setContent(x));
		Optional.of(cardUpdateReqDto.getGeneration()).ifPresent(x -> card.setGeneration(x));
		Optional.of(cardUpdateReqDto.getCampus()).ifPresent(x -> card.setCampus(x));
		Optional.of(cardUpdateReqDto.getBan()).ifPresent(x -> card.setBan(x));
		Optional.of(cardUpdateReqDto.getGithubId()).ifPresent(x -> card.setGithubId(x));
		Optional.of(cardUpdateReqDto.getBojId()).ifPresent(x -> card.setBojId(x));
		Optional.of(cardUpdateReqDto.getBlogAddr()).ifPresent(x -> card.setBlogAddr(x));
		Optional.of(cardUpdateReqDto.getCompany()).ifPresent(x -> card.setCompany(x));
		Optional.of(cardUpdateReqDto.getTrack()).ifPresent(x -> card.setTrack(x));
	}

	@Override
	public void deleteCard(Long cardId) {
		cardRepository.deleteById(cardId);
	}
}
