const pattern = {
    'email': /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    'phone': /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
    'facebook': /www.facebook.com/,
    'whatsapp': /wa.me/,
    'instagram': /www.instagram.com/,
    'youtube': /www.youtube.com/,
    'linkedin': /www.linkedin.com/,
    'twitter': /twitter.com/,
    'website': /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
}


export function createAutoLead(obj, urls) {
    let arr;
    let newLead = {
        'fullName': '',
        'phone': '',
        'address': '',
        'email': '',
        'countryAddress': '',
        'birthday': '',
        'timeToCall': '',
        'zipCode': '',
        'website': '',
        'twitter': '',
        'whatsapp': '',
        'linkedin': '',
        'facebook': '',
        'instagram': '',
        'youtube': ''
    }
    obj = obj.replaceAll('\xa0', ' ');

    arr = obj && obj.split(' ');
    arr = arr.filter(word => word.length !== 0 && word.length !== 1)
    if (!arr.length) return
    arr[arr.length - 1] = arr[arr.length - 1].split('\n')[0]
    if (urls && urls.length > 1) {
        // to exclude box link
        urls.length -= 1;
        arr = [...arr, ...urls]
    }

    arr.forEach(element => {
        for (let key in pattern) {
            if (element.match(pattern[key])) {
                newLead[key] = element
            }
            else {
                if (key === 'email') {
                    // check if email exists with <xxx@xxx>
                    let newW = element.split("<");
                    if (newW.length === 2) {
                        newW = newW[newW.length - 1].split(">")
                        if (newW[0].match(pattern[key])) {
                            newLead[key] = newW[0]
                        }
                    }
                }
            }
        }
    });
    return newLead;
}
