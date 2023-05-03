package com.ssafy.star.common.db.dto.response;

import com.ssafy.star.common.db.entity.Card;
import com.ssafy.star.common.db.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class MainNumberDto {
    @Schema(description = "SW역량테스트 등급별 취득자 수.")
    SwTier swTier;

    @Getter
    class SwTier {
        int IMCnt;
        int ACnt;
        int APlusCnt;
        int BCnt;
        int CCnt;
        int NullCnt;

        public SwTier(List<Card> cardList, List<User> userList) {
            int IMCnt = 0;
            int ACnt = 0;
            int APlusCnt = 0;
            int BCnt = 0;
            int CCnt = 0;
            int NullCnt = userList.size() - cardList.size();
            for (Card card : cardList) {
                String swTier = card.getSwTier();
                switch (swTier == null ? "NULL" : swTier) {
                    case "IM":
                        IMCnt += 1;
                        break;
                    case "A":
                        ACnt += 1;
                        break;
                    case "A+":
                        APlusCnt += 1;
                        break;
                    case "B":
                        BCnt += 1;
                        break;
                    case "C":
                        CCnt += 1;
                        break;
                    case "NULL":
                        NullCnt += 1;
                        break;
                }
            }

            this.IMCnt = IMCnt;
            this.ACnt = ACnt;
            this.APlusCnt = APlusCnt;
            this.BCnt = BCnt;
            this.CCnt = CCnt;
            this.NullCnt = NullCnt;
        }
    }

    public MainNumberDto(List<Card> cardList, List<User> userList) {
        this.swTier = new SwTier(cardList, userList);
    }
}
