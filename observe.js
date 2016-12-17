export default class Observe
{
    static get TypeNewConst(){ return 'New'; }
    static get TypeUpdateConst(){ return 'Update'; }
    static get TypeDeleteConst(){ return 'Delete'; }

    static watch( obj, callback, parentKey )
    {
        let handler = 
        {
            set: ( target, key, value ) =>
            {
                if( target[ key ] == null )
                {
                    let message = 
                    {
                        event : Observe.TypeNewConst,
                        parentKey,
                        key,
                        value
                    }
                    callback( message );
                }
                else
                {
                    if( target[ key ] != value )
                    {
                        let message = 
                        {
                            event : Observe.TypeUpdateConst,
                            parentKey,
                            key,
                            newValue : value,
                            oldValue : target[ key ]
                        }
                        callback( message );
                    }
                }
                target[ key ] = value;
                return true;
            },
            deleteProperty : ( target, key ) =>
            {
                let message = 
                {
                    event : Observe.TypeDeleteConst,
                    parentKey,
                    key
                }
                callback( message );
                return true;
            }
        }
        for( let key in obj )
        {
            if( obj[ key ] instanceof Object )
            {
                obj[ key ] = Observe.watch( obj[ key ], callback, `${( parentKey != null ) ? parentKey + '.' : '' }${key}` );
            }
        }
        return new Proxy( obj, handler );
    }

    static unwatch( obj )
    {
        let o = {};
        for( let key in obj )
        {
            if( obj[ key ] instanceof Object )
            {
                o[ key ] = Observe.unwatch( obj[ key ] );
            }
            else
            {
                o[ key ] = obj[ key ];
            }
        }
        return o;
    }
}
