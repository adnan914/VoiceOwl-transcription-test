export default function serverErrorHandler (error: any) {
	console.log(error)
	return { 
		status: error?.response?.status, 
		message:  error?.response?.data?.message ? error?.response?.data?.message : error?.response?.statusText,
		success: false 
	}
}
