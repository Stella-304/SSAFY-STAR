package com.ssafy.star.common.provider;

public interface SmtpProvider {
    void sendPwd(String email, String pwd);
    void emailAuth(String email, String code);
}
