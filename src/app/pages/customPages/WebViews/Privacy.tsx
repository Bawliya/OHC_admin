import { getWebFunction } from "../../../services/setting/setting";
import { useEffect, useState } from "react";

const PrivacyPolicyView = () => {
    // use state for webview
    const [webViews, setWebView] = useState<string>('')

    useEffect(() => {
        getWebView()
    });

    const getWebView = async () => {
        const res = await getWebFunction()
        console.log(res?.data?.data?.customer_privacy_policy)
        setWebView(res?.data?.data?.customer_privacy_policy)
    }


    return (
        <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
            <div className="d-flex flex-column flex-column-fluid">

                <div className="app-content flex-column-fluid" id="kt_app_content">
                    <div
                        className="app-container container-xxl"
                        id="kt_app_content_container"
                    >
                        <div
                            id="kt_ecommerce_add_product_form"
                            className="form d-flex flex-column flex-lg-row fv-plugins-bootstrap5 fv-plugins-framework"
                        >
                            <div className="flex-wrap" style={{ flexWrap: "wrap", width: "100%", wordWrap: "break-word" }}>
                                <div dangerouslySetInnerHTML={{ __html: webViews }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyView;
