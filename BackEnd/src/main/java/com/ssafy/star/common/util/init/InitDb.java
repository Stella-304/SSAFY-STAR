package com.ssafy.star.common.util.init;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;

/*
* ddl-auto: create 일 때, 기본적으로 쌓일 더미데이터를 기술하는 클래스
* Spring Boot 시작 시, Component 애노테이션으로 인해 자동으로 Bean 등록되며 PostConstruct가 실행됨
* @Author 이상학
*/
@Component
@RequiredArgsConstructor
public class InitDb {


    @PostConstruct
    public void init(){
        exampleInit();
    }

    /*
    * 메소드 생성 후, 더미데이터를 넣을 Repository를 불러와서 save 실행
    * @Author 이상학
    */
    @Transactional
    private void exampleInit() {

    }
}
