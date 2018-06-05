import Cookie from 'js-cookie';

export default {
    getCookie : function(_this) {
        let cookie = decodeURI( Cookie.get( 'user' ) );
        if ( cookie ) {
            let userName = cookie.split( '|' )[ 0 ];
            let loginCode = cookie.split( '|' )[ 1 ];
            if ( userName ) {
                _this.$axios.get( `api/user/getNames?name=${encodeURIComponent(userName)}` )
                    .then( result => {
                        let data = result.data;
                        if ( data.length ) {
                            if ( data[ 0 ].loginCode == loginCode ) {
                                if(_this.$route.path != `/login`){
                                    _this.$router.push(_this.$route.path);
                                }else{
                                   _this.$router.push('/'); 
                               }
                                _this.$listeners.setUser(userName);
                                _this.$listeners.changeLogStatus(true);
                            } else {
                                if(_this.$route.path != `/login`){
                                    _this.$router.push(`/login?router=${_this.$route.path.split('')[1]}`);
                                }
                                _this.$listeners.setUser();
                                _this.$listeners.changeLogStatus(false);
                            }
                        } else {
                            if(_this.$route.path != `/login`){
                                _this.$router.push(`/login?router=${_this.$route.path.split('/')[1]}`);
                            }
                            _this.$listeners.setUser();
                            _this.$listeners.changeLogStatus(false);
                        }
                    } ).catch( err => {
                        throw err;
                    } );
            } else {
               if(_this.$route.path != `/login`){
                    _this.$router.push(`/login?router=${_this.$route.path.split('/')[1]}`);
                }
                _this.$listeners.setUser();
                _this.$listeners.changeLogStatus(false);
            }
        } else {
            if(_this.$route.path != `/login`){
                _this.$router.push(`/login?router=${_this.$route.path.split('/')[1]}`);
            }
            _this.$listeners.setUser();
            _this.$listeners.changeLogStatus(false);
        }
    }
}

