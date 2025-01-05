import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchQuickAccess } from '../services/home-api-service';
// Component to render dynamic headers
const SectionHeader = ({ title }) => (
    <h1 className="heading">{title}</h1>
);

export default function Home() {

    let [dataitems, setdataitems] = useState([])
    useEffect(() => {
        mounted()
    }, [])

    function mounted() {
        fetchQuickAccess().then((res) => {
            setdataitems(res)
        }).catch((err) => {
            console.log(err)
        })
    }

    function redirectUrl(data) {
        console.log(data);

        window.open(data.redirect_url, '_blank');
    }

    return (
        <>
            <div className="quick-access-logo">
                <FontAwesomeIcon icon="fa-solid fa-universal-access" className="logo-icon" />
                <span>Quick Access</span>
            </div>


            {dataitems.map((item, index) => {
                return <>
                    <div className="main-content" key={index} >
                        <SectionHeader title={item.cat} />
                        <div className="grid-container" key={index + 1}>
                            {item.data.map((media, idx) => (
                                <div className="grid-item" key={idx} onClick={() => { redirectUrl(media) }}>
                                    <div className="icon">
                                        {media.is_icon === "1" && <FontAwesomeIcon icon={media.icon_code} size="2xl" />}
                                    </div>
                                    <span>{media.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            })}

        </>
    );
}
