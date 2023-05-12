package com.ssafy.star.api.service;

import com.ssafy.star.common.auth.enumeration.ChartEnum;
import com.ssafy.star.common.db.dto.response.ChartDto;
import com.ssafy.star.common.db.dto.response.CsDto;
import com.ssafy.star.common.db.dto.response.SayingDto;
import com.ssafy.star.common.db.entity.Card;
import com.ssafy.star.common.db.repository.CardRepository;
import com.ssafy.star.common.util.ChartUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChartServiceImpl implements ChartService {

    private final CardRepository cardRepository;

    ChartUtil chartUtil = new ChartUtil();

    @Override
    public ChartDto chartGet(String sort) {

        if(sort == null) { return null; }

        List<Card> cardList = cardRepository.findAll();
        Map<String, List<Card>> map = new HashMap<>();

        if(sort.equals(String.valueOf(ChartEnum.generation))) {
            map = cardList.stream().filter(card -> (card.getGeneration() != null && !card.getGeneration().isBlank()))
                    .collect(Collectors.groupingBy((Card::getGeneration)));
        }
        else if(sort.equals(String.valueOf(ChartEnum.campus))) {
            map = cardList.stream().filter(card -> (card.getCampus() != null && !card.getCampus().isBlank()))
                    .collect(Collectors.groupingBy((Card::getCampus)));
        }
        else if(sort.equals(String.valueOf(ChartEnum.bojTier))) {
            map = cardList.stream().filter(card -> (card.getBojTier() != null && !card.getBojTier().isBlank()))
                    .collect(Collectors.groupingBy((Card::getBojTier)));
        }
        else if(sort.equals(String.valueOf(ChartEnum.major))) {
            map = cardList.stream().filter(card -> (card.getMajor() != null && !card.getMajor().isBlank()))
                    .collect(Collectors.groupingBy((Card::getMajor)));
        }
        else if(sort.equals(String.valueOf(ChartEnum.swTier))) {
            map = cardList.stream().filter(card -> (card.getSwTier() != null && !card.getSwTier().isBlank()))
                    .collect(Collectors.groupingBy((Card::getSwTier)));
        }
        else if(sort.equals(String.valueOf(ChartEnum.role))) {
            map = cardList.stream().filter(card -> (card.getRole() != null && !card.getRole().isBlank()))
                    .collect(Collectors.groupingBy((Card::getRole)));
        }
        else if(sort.equals(String.valueOf(ChartEnum.track))) {
            map = cardList.stream().filter(card -> (card.getTrack() != null && !card.getTrack().isBlank()))
                    .collect(Collectors.groupingBy((Card::getTrack)));
        }
        else return null;


        List<Object[]> chart = new ArrayList<>();

        int totalSize = map.values().stream().mapToInt(List::size).sum();
        map.forEach((k, v) -> chart.add(new Object[]{k, v.size(), Math.round(((v.size()/(totalSize/100.0)) * 10)) /10.0}));

        return new ChartDto(chart);
    }

    @Override
     public SayingDto sayingGet() {
         List<String[]> sayingList = chartUtil.getSaying();
         Collections.shuffle(sayingList);
        return new SayingDto(sayingList);
    }

    @Override
    public CsDto csGet() {
        List<String[]> csList = chartUtil.getCs();
        Collections.shuffle(csList);
        return new CsDto(csList);
    }
}
