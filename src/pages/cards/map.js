const Map = () => {
    return ( 
        <div>
            <iframe 
                width="600" 
                height="500" 
                style={{
                    height : 300,
                    width : 400,
                    border : 0
                }}
                id="gmap_canvas"
                src="https://maps.google.com/maps?q=fsts&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                ></iframe>   
        </div>
        );
}
 
export default Map;