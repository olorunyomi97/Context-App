import React, { useState, useEffect } from 'react'
import { Link, useParams} from "react-router-dom";
import { useLocation } from "react-router-dom";
import PrimaryButton from 'components/buttons/PrimaryButton';
import { addDays } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const FilterContent = (props: any) => {
    const { loading, filter } = props;
    // console.log(filter)

    const [shippingType, setShippingType] = useState<string | null>("");
    const [status, setStatus] = useState<string | null>("");
    const [creator, setCreator] = useState<string | null>("");
    // const [originPort, setOriginPort] = useState<string | null>("");
    
    const params = useParams();
	const location:any = useLocation();
	const urlParams = new URLSearchParams(location.search)


    
    // const [dateRange, setDateRange] = useState({
    //     selection: {
    //         startDate: new Date(),
    //         endDate: null,
    //         key: 'selection'
    //     },
    //     compare: {
    //         startDate: new Date(),
    //         endDate: addDays(new Date(), 3),
    //         key: 'compare'
    //     }
    // });

    const [dateRange, setDateRange] = useState([
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
          key: 'selection'
        }
      ]);
    

    // useEffect(() => {
    //     if(urlParams.has("shipping_type")){
    //         setShippingType(urlParams.get("shipping_type"))        
    //     }
    //     if(urlParams.has("status")){
    //         setStatus(urlParams.get("status"))
    //     }
    // }, [])

    const onSubmitFilter = () => {
        let url = ""
        if (shippingType) {
            url += `shipping_type=${shippingType}`
        }
        if (status){
            url += `${url ? "&" : ""}status=${status}`
        }
        if (creator){
            url += `${url ? "&" : ""}creator=${creator}`
        }
        // if (dateRange){
        //     url += `${url ? "&" : ""}date_range=${dateRange}`
        // }
        window.location.replace(`${window.location.origin}/quotes?${url}`);
    }

    //   const onSubmitFilter = () => {
    //     let url = ""
    //     if (shippingType !== null || status !== null || creator !== null || originPort !== null) {
    //         url += `shipping_type=${shippingType}?status=${status}?creator=${creator}?origin_port=${originPort}`
    //     }
    //     window.location.replace(`${window.location.origin}/quotes?${url}`);
    // }



    return (
        <div className='' 
            style={{
                position: 'absolute',
                zIndex: '1',
                backgroundColor: 'white'
            }}
        >
        {/* <i className="ion-ios-play"></i> */}
        <div className="px-2 py-2 top-divider right-divider bottom-divider left-divider w-full">
            <div className="px-1 py-1 top-divider right-divider bottom-divider left-divider w-full mb-3 mt-3">
                <select 
                    name="import" 
                    style={{width: '100%', fontSize:'12px'}}
                    onChange={(e) => {
                        // @ts-ignore
                        setShippingType(e?.target?.value)
                    }}
                    // @ts-ignore
                    defaultValue={shippingType}
                >
                   <option value="">Filter by all shipping types</option>
                        <option value="import">Import</option>
                        <option value="export">Export</option>
                    
                </select>
            </div>
            <div className="px-1 py-1 top-divider right-divider bottom-divider left-divider w-full mb-3 mb-3 mt-3">
                <select 
                    name="status" 
                    style={{width: '100%', fontSize:'12px'}}
                    onChange={(e) => {
                        // @ts-ignore
                        setStatus(e?.target?.value)
                    }}
                >
                    <option value="">Filter by status</option>
                    <option value="early">Early</option>
                    <option value="warning">Warning</option>
                    <option value="late">Late</option>
                </select>
            </div>
            <div className="px-1 py-1 top-divider right-divider bottom-divider left-divider w-full mb-3 mb-3 mt-3">
                <select 
                    name="status" 
                    style={{width: '100%', fontSize:'12px'}}
                    onChange={(e) => {
                        // @ts-ignore
                        setCreator(e?.target?.value)
                    }}
                >
                    <option value="">Filter by Creator</option>
                    <option value="admin">Admin</option>
                    <option value="platform">Platform</option>
                </select>
            </div>
            {/* <div className="px-1 py-1 top-divider right-divider bottom-divider left-divider w-full mb-3 mb-3 mt-3">
                <DateRangePicker
                    name="date_range" 
                    onChange={item => setDateRange([item.selection])}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    months={1}
                    ranges={dateRange}
                    direction="vertical"
                />;

            </div> */}
            <div 
                className='mb-3 mt-3'
            >
                {/* @ts-ignore */}
                    <PrimaryButton 
                    title='Filter'
                    loading={loading}
                    onClick={() => onSubmitFilter()}
                />
            </div>
        </div>
    </div>
    )
}

export default FilterContent;