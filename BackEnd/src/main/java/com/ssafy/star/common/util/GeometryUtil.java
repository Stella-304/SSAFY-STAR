package com.ssafy.star.common.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.star.constellation.Point3D;

import java.io.File;
import java.io.IOException;
import java.util.List;

public class GeometryUtil {
    public static int getLevelFromCardCnt(int cardCnt) {
        if (cardCnt <= 8)
            return 1;
        if (cardCnt <= 25)
            return 2;
        if (cardCnt <= 100)
            return 3;
        if (cardCnt <= 400)
            return 4;
        if (cardCnt <= 1250)
            return 5;
        return 6;
    }
    public static int getVerticesFromLevel(int level) {
        if (level==1)
            return 12;
        if (level==2)
            return 32;
        if (level==3)
            return 162;
        if (level==4)
            return 642;
        if (level==5)
            return 2562;
        return 10242;
    }
    public static int getRadiusFromLevel(int level){
        if (level==1)
            return 1;
        if (level==2)
            return 1;
        if (level==3)
            return 2;
        if (level==4)
            return 2;
        if (level==5)
            return 4;
        return 4;
    }
}
