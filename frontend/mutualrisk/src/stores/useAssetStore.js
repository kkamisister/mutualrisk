import { create } from 'zustand';

const useAssetStore = create(set => ({
	assets: [], // 자산 정보를 저장할 배열
	totalCash: 0, // 총 자산을 저장할 변수

	addAsset: asset =>
		set(state => ({
			assets: [...state.assets, asset],
		})),

	removeAsset: assetId =>
		set(state => ({
			assets: state.assets.filter(asset => asset.id !== assetId),
		})),

	updateAsset: updatedAsset =>
		set(state => ({
			assets: state.assets.map(asset =>
				asset.id === updatedAsset.id ? updatedAsset : asset
			),
		})),

	addTotalCash: cash =>
		set(() => ({
			totalCash: cash,
		})),

	updateTotalCash: cash =>
		set(() => ({
			totalCash: cash,
		})),
}));

export default useAssetStore;
