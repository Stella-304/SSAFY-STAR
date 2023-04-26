package com.ssafy.star.api.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Stack;

import com.ssafy.star.common.db.dto.response.CardDetailDto;
import com.ssafy.star.common.db.dto.response.EdgeDto;
import com.ssafy.star.common.db.entity.Coordinate;
import com.ssafy.star.common.db.repository.CardRepository;
import com.ssafy.star.common.db.repository.CoordinateRepository;
import com.ssafy.star.common.util.GeometryUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.ssafy.star.common.db.dto.response.ConstellationListDto;
import com.ssafy.star.common.db.entity.Card;
import com.ssafy.star.common.db.entity.User;
import com.ssafy.star.common.db.repository.CompanyRepository;
import com.ssafy.star.common.db.repository.UserRepository;
import com.ssafy.star.common.exception.CommonApiException;
import com.ssafy.star.common.provider.AuthProvider;
import com.ssafy.star.common.util.CallAPIUtil;
import com.ssafy.star.common.util.constant.CommonErrorCode;
import com.ssafy.star.common.util.constant.ErrorCode;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CardServiceImpl implements CardService {

    final UserRepository userRepository;
    final CompanyRepository companyRepository;
    final CardRepository cardRepository;
    final CoordinateRepository coordinateRepository;

    @Override
    @Transactional
    public void updateBojTier(long userId) {
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
    public ConstellationListDto getCardList(String filter) {
        List<Card> cardList = cardRepository.findAll();

        boolean isCelestial=true;
        if(!filter.equals("")) isCelestial=false;
        List<EdgeDto> edgeDtoList = hi(cardList);
        List<CardDetailDto> detailDtoList = setCoordinates(cardList, isCelestial);
        return new ConstellationListDto(detailDtoList, edgeDtoList);
    }

    public List<CardDetailDto> setCoordinates(List<Card> cardList, boolean isCelestial) {
        int cardCnt = cardList.size();
        //기본 천구
        int level = 4;
        int r= 20;
        if(!isCelestial){
            GeometryUtil.getLevelFromCardCnt(cardCnt);
            GeometryUtil.getRadiusFromLevel(level);
        }
        int vertices = GeometryUtil.getVerticesFromLevel(level);
        boolean[] isSeleceted = new boolean[vertices];
        Stack<Integer> selectedCoordinatesStk = new Stack<>();
        int pick;
        for(int i=0;i<cardCnt;i++){
            while(true) {
                pick = (int) Math.random() * cardCnt;
                if (!isSeleceted[pick]) {
                    isSeleceted[pick] = true;
                    selectedCoordinatesStk.add(pick);
                    break;
                }
            }
        }
        Pageable pageable = PageRequest.of(0, vertices);
        //level별 coordinate limit 걸기
        List<Coordinate> coordinateList= new ArrayList<>();
        if(level==1){
            coordinateList=coordinateRepository.findTop12ByOrderByIdDesc();
        }else if(level==2){
            coordinateList=coordinateRepository.findTop42ByOrderByIdDesc();
        }else if(level==3){
            coordinateList=coordinateRepository.findTop162ByOrderByIdDesc();
        }else if(level==4){
            coordinateList=coordinateRepository.findTop642ByOrderByIdDesc();
        }else if(level==5){
            coordinateList=coordinateRepository.findTop2562ByOrderByIdDesc();
        }else{
            coordinateList=coordinateRepository.findAll();
        }

        List<CardDetailDto> detailDtoList = new ArrayList<>();
        for(int i=0;i<cardCnt;i++){
            int selected=selectedCoordinatesStk.pop();
            detailDtoList
                    .add(new CardDetailDto(cardList.get(i)
                            ,r*coordinateList.get(selected).getX()
                            ,r*coordinateList.get(selected).getY()
                            ,r*coordinateList.get(selected).getZ()));
        }
        
        return detailDtoList;
    }

    //상학쓰 구현파트
    public List<EdgeDto> hi(List<Card>cardList){
        return null;
    }
    @Override
    public List<String> searchCompany(String query) {
        companyRepository.searchCompanyList(query).stream().forEach(System.out::println);
        return companyRepository.searchCompanyList(query);
    }

}
