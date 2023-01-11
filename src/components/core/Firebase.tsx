import { initializeApp } from "firebase/app";
import { Analytics, getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
	apiKey: "AIzaSyCfhDF0q_XDqXF1ZCSgYvDjMhWsXesvHPc",
	authDomain: "sw-space-site.firebaseapp.com",
	projectId: "sw-space-site",
	storageBucket: "sw-space-site.appspot.com",
	messagingSenderId: "44919937572",
	appId: "1:44919937572:web:1f38ed6e05670ed8acd6b1",
	measurementId: "G-1F620CGEGB"
};


let analytics: Analytics;
if (firebaseConfig?.projectId) {
	const app = initializeApp(firebaseConfig);
	if (app.name && typeof window !== 'undefined') {
	  analytics = getAnalytics(app);
	}
  }

export function GAPageView() {
	logEvent(analytics, 'page_view', {
		page_location: window.location.href,
	});
}

export function GAEvent(name: string, data?: any) {
	logEvent(analytics, name, data);
}
