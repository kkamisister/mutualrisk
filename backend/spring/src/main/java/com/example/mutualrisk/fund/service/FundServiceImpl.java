package com.example.mutualrisk.fund.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.mutualrisk.common.dto.CommonResponse.ResponseWithData;
import com.example.mutualrisk.fund.dto.FundResponse;
import com.example.mutualrisk.fund.dto.FundResponse.FundAssetInfo;
import com.example.mutualrisk.fund.dto.FundResponse.FundInfo;
import com.example.mutualrisk.fund.dto.FundResponse.FundResultDto;
import com.example.mutualrisk.fund.entity.Fund;
import com.example.mutualrisk.fund.repository.FundRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class FundServiceImpl implements FundService {

	private final FundRepository fundRepository;

	@Override
	public ResponseWithData<FundResultDto> getAllFunds() {

		// 전체 펀드 정보를 가지고 온다
		List<Fund> allfunds = fundRepository.getAllfunds();

		// 펀드 정보를 dto로 변환한 리스트를 만든다
		List<FundInfo> fundInfos = allfunds.stream()
			.map(FundServiceImpl::apply)
			.toList();


		// 결과를 resultDTO에 담아서 반환한다
		FundResultDto fundResultDto = FundResultDto.builder()
			.fundNum(fundInfos.size())
			.funds(fundInfos)
			.build();

		return new ResponseWithData<>(HttpStatus.OK.value(),"펀드 조회에 성공하였습니다",fundResultDto);
	}

	// 펀드 정보를 받아서 DTO로 변환하여 반환한다
	private static FundInfo apply(Fund f) {
		FundInfo result = FundInfo.builder()
			.assetNum(f.getAsset().size())
			.type(f.getType())
			.submissionDate(f.getSubmissionDate())
			.company(f.getCompany())
			.valueOfHoldings(f.getValueOfHoldings())
			.asset(
				getAssetInfos(f)
			)
			.build();

		return result;
	}

	// 펀드에 있는 자산을 DTO로 변환하여 리스트에 담는다
	private static List<FundAssetInfo> getAssetInfos(Fund f) {
		return f.getAsset().stream()
			.map(FundAssetInfo::from)
			.toList();
	}
}
