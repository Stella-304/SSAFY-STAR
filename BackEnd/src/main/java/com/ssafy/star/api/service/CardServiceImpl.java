package com.ssafy.star.api.service;

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
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Log4j2
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

        User user = userRepository.findById(userId).orElseThrow(() -> new CommonApiException(CommonErrorCode.USER_NOT_FOUND));

        Card card = Optional.ofNullable(user.getCard()).orElseThrow(() -> new CommonApiException(CommonErrorCode.NO_CARD_PROVIDED));

        String bojId = Optional.ofNullable(card.getBojId()).orElseThrow(() -> new CommonApiException(CommonErrorCode.NO_BOJ_ID_PROVIDED));

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
        cardList = cardRepository.getAllCardListWithUser();
        isCelestial = true;
        List<CardDetailDto> detailDtoList = setCoordinates(cardList, isCelestial);
//        List<EdgeDto> edgeDtoList = hi(cardList);
        List<EdgeDto> edgeDtoList = setEdges(detailDtoList);
        return new ConstellationListDto(detailDtoList, edgeDtoList);
    }

    private List<EdgeDto> setEdges(List<CardDetailDto> detailDtoList) {
        List<EdgeDto> edgeList=new ArrayList<>();
        edgeList=GeometryUtil.getEdgeList(detailDtoList);
        return edgeList;
    }

    public List<CardDetailDto> setCoordinates(List<Card> cardList, boolean isCelestial) {
        int cardCnt = cardList.size();
        //기본 천구
        int level;
        int r;
        level = GeometryUtil.getLevelFromCardCnt(cardCnt);
        r = GeometryUtil.getRadiusFromLevel(level);
        if (isCelestial) {
            level = 6;
            r = 20;
        }
        int vertices = GeometryUtil.getVerticesFromLevel(level);
        List<Integer> numbers = new ArrayList<>();
        for (int i = 0; i < vertices; i++) {
            numbers.add(i);
        }
        List<Integer> result = new ArrayList<Integer>();
        Random random = new Random();
        for (int i = 0; i < cardCnt; i++) {
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
            int selected = result.get(i);
            detailDtoList.add(new CardDetailDto(cardList.get(i), r * coordinateList.get(selected).getX(), r * coordinateList.get(selected).getY(), r * coordinateList.get(selected).getZ()));
        }
        return detailDtoList;
    }

//    //상학쓰 구현파트
//    public List<EdgeDto> hi(List<Card> cardList) {
//        return null;
//    }

    @Override
    public List<String> searchCompany(String query) {
        companyRepository.searchCompanyList(query).stream().forEach(System.out::println);
        return companyRepository.searchCompanyList(query);
    }

    @Override
    @Transactional
    public void registCard(CardRegistReqDto cardRegistReqDto) {
        long userId = authProvider.getUserIdFromPrincipal();
        User user = userRepository.findById(userId).orElseThrow(() -> new CommonApiException(CommonErrorCode.USER_NOT_FOUND));
        if(user.getCard()!=null){
            throw new CommonApiException(CommonErrorCode.ALEADY_EXIST_CARD);
        }
        Card card = cardRegistReqDto.of(user);
        cardRepository.save(card);
        user.setCard(card);
    }

    @Override
    @Transactional
    public void updateCard(CardUpdateReqDto cardUpdateReqDto) throws Exception {
        Card card = cardRepository.findById(cardUpdateReqDto.getId()).orElseThrow(() -> new Exception());
        Optional.ofNullable(cardUpdateReqDto.getContent()).ifPresent(x -> card.setContent(x));
        Optional.ofNullable(cardUpdateReqDto.getGeneration()).ifPresent(x -> card.setGeneration(x));
        Optional.ofNullable(cardUpdateReqDto.getCampus()).ifPresent(x -> card.setCampus(x));
        Optional.ofNullable(cardUpdateReqDto.getBan()).ifPresent(x -> card.setBan(x));
        Optional.ofNullable(cardUpdateReqDto.getGithubId()).ifPresent(x -> card.setGithubId(x));
        Optional.ofNullable(cardUpdateReqDto.getBojId()).ifPresent(x -> card.setBojId(x));
        Optional.ofNullable(cardUpdateReqDto.getBlogAddr()).ifPresent(x -> card.setBlogAddr(x));
        Optional.ofNullable(cardUpdateReqDto.getCompany()).ifPresent(x -> card.setCompany(x));
        Optional.ofNullable(cardUpdateReqDto.getTrack()).ifPresent(x -> card.setTrack(x));
    }

    @Override
    public void deleteCard(Long cardId) {
        cardRepository.deleteById(cardId);
    }
}
