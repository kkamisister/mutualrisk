import { create } from 'zustand';

const useAssetStore = create(set => ({
	assets: [], // 자산 정보를 저장할 배열
	addAsset: asset =>
		set(state => ({
			assets: [...state.assets, asset], // 자산 추가
		})),
	removeAsset: assetId =>
		set(state => ({
			assets: state.assets.filter(asset => asset.id !== assetId), // 자산 제거
		})),
	updateAsset: updatedAsset =>
		set(state => ({
			assets: state.assets.map(asset =>
				asset.id === updatedAsset.id ? updatedAsset : asset
			), // 자산 정보 업데이트
		})),
}));

export default useAssetStore;
