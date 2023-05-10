package com.ssafy.star.api.service;

import java.util.ArrayList;
import java.util.List;

import com.ssafy.star.common.db.dto.response.MainNumberDto;
import com.ssafy.star.common.db.entity.Card;
import com.ssafy.star.common.db.repository.CardRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.star.common.db.dto.response.BadgeListDto;
import com.ssafy.star.common.db.dto.response.LandingNumberDto;
import com.ssafy.star.common.db.entity.AuthStatus;
import com.ssafy.star.common.db.entity.User;
import com.ssafy.star.common.db.repository.AuthStatusRepository;
import com.ssafy.star.common.db.repository.UserRepository;
import com.ssafy.star.common.exception.CommonApiException;
import com.ssafy.star.common.provider.SmtpProvider;
import com.ssafy.star.common.util.constant.CommonErrorCode;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NumberServiceImpl implements NumberService {

    private final UserRepository userRepository;
    private final CardRepository cardRepository;
    private final int ALL_SSAFY_COUNT = 7350;

    @Override
    public LandingNumberDto getLandingNumber() {
        List<User> user = userRepository.findAll();
        int useSiteAllCnt = user.size();
        int useSiteSsafyCnt = (int) user.stream().filter(x -> x.isAuthorized()).count();
        return LandingNumberDto.builder()
                .allSsafyCount(ALL_SSAFY_COUNT)
                .useSiteAllCount(useSiteAllCnt)
                .useSiteSsafyCount(useSiteSsafyCnt)
                .build();
    }

    @Override
    public MainNumberDto getMainNumber() {
        List<User> userList = userRepository.findAllWithCard();
        List<Card> cardList = new ArrayList<>();
        for (User user : userList) {
            Card card = user.getCard();
            // 여기 DB 없는지 확인해봐야함..
            if (card != null)
                cardList.add(user.getCard());
            // System.out.println(user.getCard());
        }
        // System.out.println(userList.size());


        return new MainNumberDto(cardList, userList);
    }
}
