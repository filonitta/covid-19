import { ENV } from '@env';
import useFetch from '@/services/fetch';

const useApi = (url, intialData = null) => {
	const {
		data,
		isLoading,
		isError,
		errorMessage,
	} = useFetch(`${ENV.api}/${url}`, intialData);

	return {
		data,
		isLoading,
		isError,
		errorMessage,
	}
};

export default useApi;