package com.ssafy.star.api.service;

public interface InitDataService {
	void initCompany();
	void initUser() throws Exception;
	void initCoordinate();

	void initAll() throws Exception;
}
