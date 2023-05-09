package com.ssafy.star.common.util;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

@Component
public class RandValueMaker {

    final char[] LOWER_CASE_ARR = { 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
            'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' };
    final char[] UPPER_CASE_ARR = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
            'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };
    final char[] NUMBER_ARR = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' };
//    final char[] SYMBOL_ARR = { '!', '@', '?', '#' };

    final char[] ALL_ARR = { 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
            'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
            'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'};
    final int PWD_LEN = 16;
    final int LOWER_CASE_CNT = 5;
    final int UPPER_CASE_CNT = 5;
    final int NUMBER_CNT = 6;
//    final int SYMBOL_CNT = 2;

    final int NICKNAME_LEN = 5;

    public String makeNicknameCode() {

        Random random = new Random();
        StringBuilder stringBuilder = new StringBuilder("중복닉네임");

        for(int i = 0; i < NICKNAME_LEN; i++) {
            stringBuilder.append(ALL_ARR[random.nextInt(ALL_ARR.length)]);
        }

        return stringBuilder.toString();
    }

    public String makeVerificationCode() {
        return Integer.toString((int) (Math.random() * 100000000));
    }

    public String makeRandPwd() {

        Random random = new Random();
        List<Character> list = new ArrayList<>();
        StringBuilder stringBuilder = new StringBuilder();

        for (int i = 0; i < LOWER_CASE_CNT; i ++) {
            list.add(LOWER_CASE_ARR[random.nextInt(LOWER_CASE_ARR.length)]);
        }

        for (int i = 0; i < UPPER_CASE_CNT; i ++) {
            list.add(UPPER_CASE_ARR[random.nextInt(UPPER_CASE_ARR.length)]);
        }

//        for (int i = 0; i < SYMBOL_CNT; i ++) {
//            list.add(SYMBOL_ARR[random.nextInt(SYMBOL_ARR.length)]);
//        }

        for (int i = 0; i < NUMBER_CNT; i ++) {
            list.add(NUMBER_ARR[random.nextInt(NUMBER_ARR.length)]);
        }

        Collections.shuffle(list);

        for(int i = 0; i < PWD_LEN; i++) {
            stringBuilder.append(list.get(i));
        }

        return stringBuilder.toString();
    }
}
