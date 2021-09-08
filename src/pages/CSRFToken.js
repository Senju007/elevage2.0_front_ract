/* eslint-disable prettier/prettier */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
/* eslint-disable no-empty */
/* eslint-disable prefer-template */
import React, { useState, useEffect } from 'react';
import AuthService from "../services/AuthService"

const CSRFToken = () => {
    const [csrftoken, setcsrftoken] = useState('');

    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return 0;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await AuthService.getCookie()
            } catch (err) {

            }
        };

        fetchData();
        setcsrftoken(getCookie('csrftoken'));
    }, []);

    return (
        <input type='text' name='csrfmiddlewaretoken' value={csrftoken} />
    );
};

export default CSRFToken;