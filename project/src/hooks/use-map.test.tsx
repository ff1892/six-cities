import { renderHook } from '@testing-library/react-hooks';
import useMap from './use-map';
import { makeFakeOffer } from '../utils/mocks';

const { city } = makeFakeOffer();

describe('Hook: useMap', () => {
  it('Should return map instance with correct ref', () => {
    const fakeRef = { current: document.createElement('div') };
    const { result } = renderHook(() =>
      useMap(fakeRef, city),
    );
    expect(result.current).not.toBe(null);
  });
  it('Should return null with incorrect ref', () => {
    const fakeRef = { current: null };
    const { result } = renderHook(() =>
      useMap(fakeRef, city),
    );
    expect(result.current).toBe(null);
  });
});


