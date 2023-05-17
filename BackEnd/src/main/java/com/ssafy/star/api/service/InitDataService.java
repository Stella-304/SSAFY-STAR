package com.ssafy.star.api.service;

public interface InitDataService {
	void initCompany();
	void initUser();
	void initCoordinate();
	void initPolygon();
	void initAll();
    void initCompanyAdditional();

	void addCompany(String companyName);
}
