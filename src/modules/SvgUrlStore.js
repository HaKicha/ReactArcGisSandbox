import facebookLogo from '../resources/image/facebook.svg';
import twitterLogo from '../resources/image/twitter.svg';
import natoLogo from '../resources/image/nato.svg';
import newsLogo from '../resources/image/news.svg';
import gichdLogo from '../resources/image/gichd.svg';


export default function getSvgUrl(type) {

    switch (type) {
        case 'twitter': {
            return twitterLogo;
        }
        case 'facebook': {
            return facebookLogo;
        }
        case 'nato': {
            return natoLogo;
        }
        case 'news': {
            return newsLogo;
        }
        case 'gichd': {
            return gichdLogo;
        }
    }
}