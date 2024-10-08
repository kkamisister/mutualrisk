import { create } from 'zustand';

const useAssetStore = create(set => ({
	tempAssets: [],
	assets: [], // 자산 정보를 저장할 배열
	totalCash: 0, // 총 자산을 저장할 변수

	toggleTempAsset: asset =>
		set(state => ({
			tempAssets: [...state.tempAssets, asset],
		})),

	addAssetsToTemp: asset_list =>
		set(state => {
			const newAssets = asset_list.filter(
				newAsset =>
					!state.tempAssets.some(
						existingAsset => existingAsset.id === newAsset.id
					)
			);
			return {
				tempAssets: [...state.tempAssets, ...newAssets],
			};
		}),

	addAsset: asset =>
		set(state => {
			// assets 배열에 동일한 asset이 있는지 확인
			const assetExists = state.assets.some(
				existingAsset => existingAsset.id === asset.id
			);

			// asset이 이미 존재하면 그대로, 존재하지 않으면 추가
			return assetExists
				? state
				: {
						assets: [...state.assets, asset],
				  };
		}),

	addAssetList: asset_list =>
		set(state => {
			const newAssets = asset_list.filter(
				newAsset =>
					!state.assets.some(
						existingAsset => existingAsset.id === newAsset.id
					)
			);

			// 추가할 새로운 자산이 없을 때는 상태 변경하지 않음
			if (newAssets.length === 0) {
				return state; // 기존 상태 반환
			}

			return {
				assets: [...state.assets, ...newAssets],
			};
		}),

	removeAsset: assetId =>
		set(state => ({
			assets: state.assets.filter(asset => asset.id !== assetId),
		})),

	// userAssets 배열을 받아 전체 assets 상태를 업데이트하는 함수
	updateAsset: userAssets =>
		set(() => ({
			assets: userAssets,
		})),

	addTotalCash: cash =>
		set(state => ({
			totalCash: state.totalCash + cash,
		})),

	updateTotalCash: cash =>
		set(() => ({
			totalCash: cash,
		})),
}));

export default useAssetStore;
