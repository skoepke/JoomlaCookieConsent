(function ($) {
    
    
    if (window.hasCookieConsent) return;
    window.hasCookieConsent = true;

    var OPTIONS_VARIABLE = 'sz_mcc_options';
    var DISMISSED_COOKIE = 'sz_mcc_dismissed';

    if (document.cookie.indexOf(DISMISSED_COOKIE) > -1) {
        return;
    }

    if(typeof String.prototype.trim !== 'function') {
        String.prototype.trim = function() {
            return this.replace(/^\s+|\s+$/g, '');
        };
    }


    var Helper = {


        setCookie: function (name, value, expiryDays, domain, path) {
            expiryDays = expiryDays || 365;

            var exdate = new Date();
            exdate.setDate(exdate.getDate() + expiryDays);

            var cookie = [
                name + '=' + value,
                'expires=' + exdate.toUTCString(),
                'path=' + path || '/'
            ];

            if (domain) {
                cookie.push(
                    'domain=' + domain
                );
            }

            document.cookie = cookie.join(';');
        },

        addEventListener: function (el, event, eventListener) {
            if (el.addEventListener) {
                el.addEventListener(event, eventListener);
            } else {
                el.attachEvent('on' + event, eventListener);
            }
        }
    };



    /**
     * SZ CookieConsent Modul
     */
    var cookieconsent = {
        options: {
            message: 'This website uses cookies to ensure you get the best experience on our website. ',
            dismiss: 'OK',
            learnMore: 'Read more',
            link: null,
            container: null,
            domain: null, // default to current domain.
            path: '/',
            expiryDays: 365,
            markup: '<div class="sz_mcc_banner-wrapper">'+
                '<div class="sz_mcc_banner sz_mcc_container open">'+
                '<a href="#accept" target="_blank" class="sz_mcc_btn sz_mcc_btn_accept_all"></a>'+
                '<p class="sz_mcc_message"> </p>'+
                '</div></div>'

        },

        init: function () {
            var options = window[OPTIONS_VARIABLE];
            if (options) this.setOptions(options);




            this.setContainer();

            var that =  this;
            $(this.container).on('click','.sz_mcc_btn_accept_all', function(event){
                that.dismiss(event);
            });

            this.render();

        },

        setOptions: function (options) {
            $.extend(this.options, options);
        },

        setContainer: function () {
            if (this.options.container) {
                this.container = document.querySelector(this.options.container);
            } else {
                this.container = document.body;
            }

            // Add class to container classes so we can specify css for IE8 only.
            this.containerClasses = '';
            if (navigator.appVersion.indexOf('MSIE 8') > -1) {
                this.containerClasses += ' sz_mcc_ie8'
            }
        },

        render: function () {
            // remove current element (if we've already rendered)
            if (this.element && this.element.parentNode) {
                $(this.element).remove();
                //this.element.parentNode.removeChild(this.element);
                delete this.element;
            }

            var newDomBuild = $(this.options.markup);
            newDomBuild.find('.sz_mcc_message').html(this.options.message);

            var moreLinkMarkup = $('<a class="sz_mcc_more_info" href="#more"></a>');
            moreLinkMarkup.html(' '+this.options.learnMore);

            newDomBuild.find('.sz_mcc_message').append(moreLinkMarkup);

            newDomBuild.find('.sz_mcc_btn').html(this.options.dismiss);
            //this.element = DomBuilder.build(this.options.markup, this);
            this.element = newDomBuild;

            $(this.container).append(this.element);
        },

        dismiss: function (evt) {
            evt.preventDefault && evt.preventDefault();
            evt.returnValue = false;
            this.setDismissedCookie();
            $(this.element).remove();
        },

        setDismissedCookie: function () {
            Helper.setCookie(DISMISSED_COOKIE, 'yes', this.options.expiryDays, this.options.domain, this.options.path);
        }
    };



    $(document).ready(function() {
        cookieconsent.init();
    });



})(jQuery);
