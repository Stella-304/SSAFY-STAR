//package com.ssafy.star.api.controller;
//
//import com.ssafy.star.common.auth.exception.TokenExpireException;
//import com.ssafy.star.common.util.constant.CommonErrorCode;
//import com.ssafy.star.common.util.constant.Msg;
//import com.ssafy.star.common.util.dto.ResponseDto;
//import lombok.extern.log4j.Log4j2;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.annotation.Secured;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@Log4j2
//@RestController
//@RequestMapping("/test")
//public class AuthTestController {
//
//    @GetMapping("/excep")
//    public ResponseEntity<ResponseDto> excepTest(){
//
//        throw new TokenExpireException(CommonErrorCode.EXPIRED_TOKEN);
//
////        return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST));
//    }
//
//    @GetMapping("/test")
//    public ResponseEntity<ResponseDto> test(){
//        log.error("{}", String.valueOf(SecurityContextHolder.getContext().getAuthentication().toString()));
//        log.error("{}", String.valueOf(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString()));
//        log.error("{}", String.valueOf(SecurityContextHolder.getContext().getAuthentication().getAuthorities().toString()));
//        log.error("{}", String.valueOf(SecurityContextHolder.getContext().getAuthentication().getCredentials().toString()));
//        log.error("{}", String.valueOf(SecurityContextHolder.getContext().getAuthentication().getName().toString()));
//        log.error("{}", String.valueOf(SecurityContextHolder.getContext().getAuthentication().getDetails().toString()));
//
//
//        return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST));
//    }
//
//    @Secured("ROLE_CLIENT")
//    @GetMapping("/test1")
//    public ResponseEntity<ResponseDto> test1(){
//        return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST));
//    }
//
//    @Secured("{ROLE_CLIENT}")
//    @GetMapping("/test2")
//    public ResponseEntity<ResponseDto> test2(){
//        return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST));
//    }
//
//    @Secured({"ROLE_CLIENT", "ROLE_ADMIN"})
//    @GetMapping("/test3")
//    public ResponseEntity<ResponseDto> test3(){
//        return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST));
//    }
//
//    @Secured("{ROLE_CLIENT, ROLE_ADMIN}")
//    @GetMapping("/test4")
//    public ResponseEntity<ResponseDto> test4(){
//        return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST));
//    }
//
//    @Secured("ROLE_ADMIN")
//    @GetMapping("/test5")
//    public ResponseEntity<ResponseDto> test5(){
//        return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST));
//    }
//
//    @Secured("{ROLE_ADMIN}")
//    @GetMapping("/test6")
//    public ResponseEntity<ResponseDto> test6(){
//        return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST));
//    }
//
//    @PreAuthorize("hasRole('ROLE_CLIENT')")
//    @GetMapping("/test7")
//    public ResponseEntity<ResponseDto> test7(){
//        return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST));
//    }
//
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
//    @GetMapping("/test8")
//    public ResponseEntity<ResponseDto> test8(){
//        return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST));
//    }
//
//    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
//    @GetMapping("/test9")
//    public ResponseEntity<ResponseDto> test9(){
//        return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST));
//    }
//
//    @PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_CLIENT')")
//    @GetMapping("/test10")
//    public ResponseEntity<ResponseDto> test10(){
//        return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK, Msg.SUCCESS_REGIST));
//    }
//}
