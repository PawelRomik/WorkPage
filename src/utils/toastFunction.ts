import { toast } from "react-toastify";

export const launchToast = (type: string, text: string) => {
	toast.dismiss();
	toast.clearWaitingQueue();
	switch (type) {
		case "success":
			toast.success(text);
			break;
		case "error":
			toast.error(text);
			break;
		case "warn":
			toast.warn(text);
			break;
		default:
			toast.success(text);
	}
};
