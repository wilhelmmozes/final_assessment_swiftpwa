import Alert from '@material-ui/lab/Alert';
import { MAX_WIDTH } from '@theme_vars';
import WidgetRenderer from '@core_modules/cms/components/cms-renderer/WidgetRenderer';

const FooterView = (props) => {
    const {
        data, t, loading, error, storeConfig,
    } = props;

    if (error) {
        return (
            <Alert className="m-15" severity="error">
                {t('common:error:fetchError')}
            </Alert>
        );
    }
    if (loading) return null;
    return (
        <div className="cms-container wrapper-footer">
            {/* eslint-disable-next-line react/no-danger */}
            {/* <div dangerouslySetInnerHTML={{ __html: data.cmsBlocks.items[0].content }} /> */}
            <WidgetRenderer content={data.cmsBlocks.items[0].content} storeConfig={storeConfig} />
            <style jsx global>
                {`
                    // styling pwa footer old
                    .wrapper-footer {
                        background-color: #fff;
                        padding : 0;
                        margin-top: 40px;
                    }
                    .container-footer {
                        display: flex;
                        margin-top: 40px;
                        max-width : ${MAX_WIDTH};
                        margin : 0 auto;
                    }
                    .container-footer * {
                        letter-spacing: 0.03em;
                    }
                    .container-footer h4 {
                        letter-spacing: 0.05em;
                        text-transform: uppercase;
                    }
                    .container-footer .content-assets ul {
                        list-style: none;
                        padding-left: 0;
                    }
                    .container-footer .content-assets ul li {
                        line-height: 24px;
                        margin-bottom: 6px;
                    }
                    .container-footer .content-assets ul li a {
                        color: #575757;
                    }

                    // styling icons pwa footer weltpixel

                    body:not(.device-touch) .social-icons {
                        transition: all .3s ease;
                    }

                    a.social-icons, a.social-icons:active, a.social-icons:visited, a.social-icons:hover {
                        text-decoration: none;
                    }

                    .si-borderless {
                        border-color: transparent !important;
                    }

                    .social-icons {
                        margin: 0 5px 5px 0;
                        width: 40px;
                        height: 40px;
                        font-size: 20px;
                        text-shadow: none;
                        border: 1px solid #aaa;
                        border-radius: 3px;
                        overflow: hidden;
                        display: inline-block;
                        text-align: center !important;
                        cursor: pointer;
                        font-style: normal;
                    }

                    .footer-v1-content .border-v1 .social-icons-v1 .social-icons i {
                        font-size: 15px;
                    }

                    .footer-v1-content a:hover i {
                        color: #fff !important;
                    }

                    .social-icons:hover i:first-child {
                        margin-top: -38px;
                    }

                    body:not(.device-touch) .social-icons i {
                        -webkit-transition: all .3s ease;
                        -o-transition: all .3s ease;
                        transition: all .3s ease;
                    }

                    .social-icons i {
                        display: block;
                        position: relative;
                    }

                    .social-icons i:first-child {
                        line-height: 38px;
                        color: #555;
                    }

                    .social-icons i:nth-child(2) {
                        margin-top: 10px;
                    }

                    .si-facebook:hover, .si-colored.si-facebook {
                        background-color: #3b5998 !important;
                    }

                    .si-twitter:hover, .si-colored.si-twitter {
                        background-color: #00acee !important;
                    }

                    .si-linkedin:hover, .si-colored.si-linkedin {
                        background-color: #0e76a8 !important;
                    }

                    .si-instagram:hover, .si-colored.si-instagram {
                        background-color: #3f729b !important;
                    }

                    .si-pinterest:hover, .si-colored.si-pinterest {
                        background-color: #c8232c !important;
                    }

                    .si-youtube:hover, .si-colored.si-youtube {
                        background-color: #c4302b !important;
                    }

                    .si-vimeo:hover, .si-colored.si-vimeo {
                        background-color: #86c9ef !important;
                    }

                    .social-icons i:last-child {
                        
                        color: #fff;
                    }

                    .si-rounded {
                        border-radius: 50%;
                    }

                    // styling footer v1

                    .footer-v1 {
                        background-color: #f4f4f4;
                    }

                    .footer-v1-content {
                        box-sizing: border-box;
                        display: flex;
                        flex: 0 1 auto;
                        flex-direction: row;
                        flex-wrap: wrap;
                        max-width: 1400px;
                        margin: 0 auto;
                        float: none;
                    }

                    .footer-v1-content .mini-logo {
                        padding-top: 50px;
                        margin-top: 0px
                    }

                    .footer-v1-content .footer-title {
                        font-size: 16px;
                        padding: 50px 0 10px;
                        text-transform: uppercase;
                        font-weight: 600;
                    }

                    .footer-v1-content p {
                        color: #575757;
                        margin-top: 0px;
                        margin-bottom: 6px;
                    }

                    .footer-v1-content .links li {
                        margin-bottom: 6px;
                        height: unset;
                        color: #575757;
                    }

                    .footer-v1-content .links li a {
                        color: #575757;
                    }

                    .footer-v1-content .links {
                        padding-left: 0px;
                    }

                    .footer-v1-content .border-v1 {
                        border-top: 1px solid #adadad;
                        margin-top: 30px;
                        padding-right: 0;
                        padding-left: 0;
                    }

                    .footer-v1-content .pull-left-md {
                        float: left;
                    }

                    .footer-v1-content .border-v1 .small-text {
                        margin-top: 15px;
                        display: block;
                    }

                    .footer-v1-content .border-v1 .social-icons-v1 {
                        margin-top: 10px;
                        float: right;
                    }
                    
                    .footer-v1-content .border-v1 .social-icons-v1 .social-icons {
                        margin: 0;
                    }

                    @media only screen and (max-width: 767px) {
                        .footer-v1-content {
                            text-align: center;
                        }

                        .footer-v1 .footer-title:after {
                            content: "";
                            width: 40%;
                            height: 1px;
                            display: block;
                            margin: 5px auto 0 auto;
                            border-top: 1px solid #cecece;
                        }

                        .footer-v1-content .pull-left-md {
                            float: unset;
                        }

                        .footer-v1-content .border-v1 .social-icons-v1 {
                            float: unset;
                        }
                    }

                    
                    // styling footer-v2

                    .footer-v2 {
                        max-width: 100%;
                        margin: 0 auto;
                        float: none;
                        padding-top: 60px;
                    }

                    .footer-v2 .center {
                        text-align: center;
                    }

                    .footer-v2 .footer-nav {
                        font-size: 12px;
                        line-height: 2em;
                        text-transform: uppercase;
                        letter-spacing: .2em;
                        font-weight: 400;
                        padding: 10px;
                    }

                    .footer-v2 .footer-nav a {
                        color: #000;
                        padding: 10px;
                    }

                    .footer-v2 .toggle {
                        display: block;
                        position: relative;
                        margin: 0 0 20px;
                    }

                    .footer-v2 .togglet.newsletter {
                        font-size: 12px;
                        line-height: 2em;
                        text-transform: uppercase;
                        letter-spacing: .2em;
                        font-weight: 400;
                        padding: 10px;
                        cursor: pointer;
                    }

                    .footer-v2 .toggle .togglec {
                        // display: block;
                        position: relative;
                        padding: 10px 0 0 24px;
                    }

                    .footer-v2 .accordionTitle {
                        cursor: pointer;
                        -moz-user-select: none;
                        -webkit-user-select: none;
                        -ms-user-select: none;
                        user-select: none;
                    }
                    
                    .footer-v2 .accordionTitle + .accordionContent {
                        display: none;
                        opacity: 0;
                        transition: all 1s ease-in-out;
                        height: 0;
                        overflow: hidden;
                    }
                    
                    .footer-v2 .accordionTitle.is-open + .accordionContent {
                        display: block;
                        opacity: 1;
                        height: auto;
                        transition: all 1s ease-in;
                    }

                    .footer-v2 .block.newsletter {
                        margin: 0 auto;
                    }

                    .footer-v2 .block.newsletter .title {
                        display: none;
                    }

                    .footer-v2 .block.newsletter .content .newsletter-container {
                        background-color: inherit;
                        margin-top: -20px;
                        height: 60px;
                        margin-bottom: unset;
                    }

                    .footer-v2 .block.newsletter .content .newsletter-container .action.subscribe {
                        margin-left: unset;
                        border-radius: unset;
                    }

                    .footer-v2 .block {
                        float: initial !important;
                    }

                    .footer-v2 .block .title {
                        display: block;
                        margin-bottom: 10px;
                    }

                    .footer-v2 .block .title strong {
                        color: #303030;
                        font-style: inherit;
                        font-weight: 400;
                        line-height: 1.1;
                        font-size: 14px;
                        margin-top: 2rem;
                        margin-bottom: 2rem;
                    }

                    @media only screen and (max-width: 767px) {
                        .footer-v2 .block.newsletter .content .newsletter-container {
                            margin-top: -20px;
                            height: 160px;
                            margin-bottom: unset;
                        }

                        .footer-v2 .toggle .togglec {
                            padding: 10px 24px 0 24px;
                        }

                        .footer-v2 .field-newsletter {
                            margin-left: 0;
                        }

                        .footer-v2 .block.newsletter .content .newsletter-container .action.subscribe {
                            width: 150px;
                        }

                        .footer-v2 .toggle {
                            margin: 0;
                        }

                        .footer-v2 .togglet.newsletter {
                            text-decoration: unset !important;
                        }
                    }


                    // styling footer v3

                    .w  {
                        background: #232323;
                        color: #ccc;
                        float: left;
                        width: 100%;
                        padding-bottom: 30px;
                        padding-top: 30px;
                    }

                    .footer-v3 {
                        padding-bottom: 10px;
                        padding-top: 60px;
                        z-index: 0;
                        position: relative;
                    }

                    .footer-v3 .footer-section2-content {
                        margin: 0 auto;
                    }

                    .footer-v3 .address-v3 {
                        line-height: 1.6;
                    }

                    .w .mini-logo {
                        padding: 8px 0;
                    }

                    .w h4 {
                        color: #ccc;
                        padding: 17px 0;
                        font-size: 20px;
                        text-transform: uppercase;
                        font-weight: 400;
                        color: #fff;
                    }

                    .footer-v3 h4 {
                        margin: 20px 0;
                    }

                    .footer-v3 .details-v3 {
                        margin-bottom: 20px;
                        margin-top: 0px;
                    }

                    .footer-v3 .address-v3 i {
                        padding-right: 5px;
                    }

                    .w i {
                        color: #fff !important;
                    }

                    .footer-v3 .footer-v3-list {
                        line-height: 1.6;
                        margin: 0;
                        padding: 0;
                        list-style: none none;
                    }

                    .footer-v3 ul>li {
                        margin: 0;
                    }

                    .w ul {
                        padding: 0;
                    }

                    .w ul li a, .w ul li a:visited, .w ul li a:hover {
                        color: #ccc;
                    }

                    .footer-v3 .newsletter-subscribe .newsletter-container {
                        background-color: inherit;
                        height: unset;
                    }

                    .footer-v3 .newsletter-subscribe .newsletter-container .field-newsletter {
                        margin-left: unset;
                    }

                    .footer-v3 .newsletter-subscribe .newsletter-container .field-newsletter input {
                        min-width: unset;
                    }

                    .footer-v3 .newsletter-subscribe .newsletter-container .action.subscribe {
                        text-transform: Capitalize;
                        background-color: #232323;
                        border: #fff 1px solid;
                        border-radius: 1px;
                        transition-duration: .3s;
                        transition-property: background-color;
                        letter-spacing: 0px;
                    }

                    .footer-v3 .newsletter-subscribe .newsletter-container .action.subscribe span {
                        color: #fff;
                        font-size: 18px;
                        font-weight: 400;
                        line-height: 18px;
                    }

                    .footer-v3 .newsletter-container .block-newsletter {
                        margin: unset;
                    }

                    @media only screen and (max-width: 767px) {
                        .footer-v3 {
                            text-align: center;
                        }

                        .footer-v3 h4.no-padding-mob {
                            padding-bottom: 0;
                        }

                        .footer-v3 .newsletter-subscribe .newsletter-container {
                            height: 80px;
                            margin-top: -20px;
                            margin-bottom: -15px;
                        }

                        .footer-v3 .newsletter-subscribe .newsletter-container .wrapper {
                            top: 35%;
                        }

                        .footer-v3 .newsletter-subscribe .newsletter-container .form.subscribe {
                            display: flex;
                            flex-direction: row;
                            // width: 100%;
                            // margin-top: 20px;
                        }

                        .footer-v3 .newsletter-subscribe .newsletter-container .actions {
                            margin-top: -10px;
                        }

                        .footer-v3 .newsletter-subscribe .newsletter-container .action.subscribe {
                            width: 100%;
                        }

                        .footer-v3 .newsletter-subscribe .newsletter-container .field-newsletter input {
                            min-width: unset;
                        }

                        .footer-v3 .newsletter-container .block-newsletter {
                            margin: 0 auto;
                        }
                    }

                    // styling footer-v5

                    .footer-v5 {
                        max-width: 100%;
                        margin: 0 auto;
                        float: none;
                    }

                    w.footer-v5 .mini-logo {
                        padding-top: 20px;
                    }

                    .footer-v5 .row {
                        max-width: 1400px;
                        width: 100%;
                        margin: 0 auto;
                    }

                    .footer-v5 .footer-section2-content {
                        margin: 0 auto;
                    }

                    .footer-v5 .mobile-toggle {
                        padding-left: 15px;
                        padding-right: 15px;
                        margin-right: 40px;
                    }

                    .footer-v5 .accordion {
                        margin-bottom: 20px;
                    }

                    .footer-v5 .accordion .newsletter-subscribe .newsletter-container {
                        background-color: inherit;
                        margin-top: -70px;
                    }

                    .footer-v5 .accordion .newsletter-subscribe .newsletter-container .field-newsletter {
                        margin-left: unset;
                    }

                    .footer-v5 .accordion .newsletter-subscribe .newsletter-container .action.subscribe {
                        text-transform: Capitalize;
                        background-color: #232323;
                        border: #fff 1px solid;
                        border-radius: 1px;
                        transition-duration: .3s;
                        transition-property: background-color;
                        letter-spacing: 0px;
                    }

                    .footer-v5 .accordion .newsletter-subscribe .newsletter-container .action.subscribe span {
                        color: #fff;
                        font-size: 18px;
                        font-weight: 400;
                        line-height: 18px;
                    }

                    .footer-v5 .footer-v5-title {
                        margin-top: 1rem;
                        margin-bottom: 1rem;
                        font-size: 17px;
                        position: relative;
                    }

                    .footer-v5 ul {
                        margin: 0;
                        padding: 0;
                        list-style: none none;
                        padding-right: 50px;
                        margin-bottom: 5px;
                    }

                    .footer-v5 ul>li {
                        margin-bottom: 5px;
                    }

                    .footer-v5 .social-text {
                        color: #cccccc;
                    }

                    .footer-v5 .social-wrapper {
                        display: flex;
                        align-items: center;
                    }

                    .footer-v5 .separation-border {
                        padding: 0;
                        width: 1px;
                        background-color: #ccc;
                        margin-right: 6%;
                        flex-basis: unset;
                    }

                    .details-v5 {
                        font-size: 10px;
                        margin-top: 5px;
                        margin-bottom: 1rem;
                    }

                    .footer-v5 .white-lnk {
                        color: #ccc;
                    }

                    .footer-v5 a:hover {
                        color: #ccc;
                        outline: 0;
                        text-decoration: none;
                    }

                    .footer-v5 .underline {
                        text-decoration: underline;
                        color: #cccccc;
                    }

                    .footer-v5 .underline:hover {
                        text-decoration: underline;
                    }

                    .footer-v5 .title-stores {
                        margin: 0;
                        padding-bottom: 5px;
                    }

                    .footer-v5 .horizontal-list {
                        display: flex;
                        padding: 0px;
                    }

                    .footer-v5 .horizontal-list .first-store {
                        padding-right: 10px;
                        border-right: 1px solid #ccc;
                    }

                    .footer-v5 .horizontal-list .stores {
                        padding-right: 10px;
                        padding-left: 10px;
                        border-right: 1px solid #ccc;
                    }

                    .footer-v5 .horizontal-list .last-store {
                        padding-left: 10px;
                    }

                    @media only screen and (max-width: 767px) {
                        .footer-v5 {
                            text-align: center;
                        }

                        .footer-v5 .mini-logo img {
                            margin-left: auto !important;
                            margin-right: auto;
                        }

                        .footer-v5 .mini-logo {
                            margin-bottom: 20px;
                        }

                        .footer-v5 ul {
                            padding-right: unset;
                        }

                        .footer-v5 .mg-mobile {
                            display: flex;
                            justify-content: center;
                        }

                        .social-text {
                            display: none;
                        }

                        .footer-v5 .accordion {
                            width: 100%;
                            border-top: 1px solid #ccc;
                            margin: 0 0 20px 0;
                        }

                        .footer-v5 .accordionTitle:after {
                            content: "+";
                            font-size: 1rem;
                            position: absolute;
                            right: 0;
                            border: none;
                            margin: 0;
                            height: auto;
                            width: auto;
                            top: 50%;
                            transform: translateY(-60%);
                        }

                        .footer-v5 .accordionTitle.is-open:after {
                            content: "-";
                        }

                        .footer-v5 .accordionTitle {
                            cursor: pointer;
                            -moz-user-select: none;
                            -webkit-user-select: none;
                            -ms-user-select: none;
                            user-select: none;
                        }
                        
                        .footer-v5 .accordionTitle + .accordionContent {
                            display: none;
                        }
                        
                        .footer-v5 .accordionTitle.is-open + .accordionContent {
                            display: block;
                        }

                        .footer-v5 .horizontal-list {
                            justify-content: center;
                        }

                        .footer-v5 .accordion .newsletter-subscribe .newsletter-container {
                            height: 0px;
                            margin-top: 0px;
                            margin-bottom: 35px;
                        }

                        .footer-v5 .newsletter-subscribe .newsletter-container .form.subscribe {
                            display: flex;
                            flex-direction: row;
                            width: 100%;
                            margin-top: 20px;
                        }

                        .footer-v5 .newsletter-subscribe .newsletter-container .actions {
                            margin-top: -10px;
                        }

                        .footer-v5 .newsletter-subscribe .newsletter-container .action.subscribe {
                            width: 100%;
                        }

                        .footer-v5 .newsletter-subscribe .newsletter-container .field-newsletter input {
                            min-width: unset;
                        }

                        .footer-v5 .newsletter-container .block-newsletter {
                            margin: 0 auto;
                        }
                    }

                `}
            </style>
        </div>
    );
};

export default FooterView;
