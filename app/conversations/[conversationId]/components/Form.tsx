"use client";

import useConversation from '@/app/hooks/useConversation';
import axios from 'axios';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';
import MessageInput from './MessageInput';
import { CldUploadButton } from "next-cloudinary";


const Form = () => {
    
    const { conversationId }=useConversation();

    const {
        register,
        handleSubmit,
        setValue,
        formState:{
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues:{
            messages:''
        }
    });

    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
        setValue('message','',{ shouldValidate: true });
        axios.post('/api/messages',{
            ...data,
            conversationId
            
        })
         
    };

    const handleUpload=(result:any)=>{
        axios.post('/api/messages',{
            image:result?.info?.secure_url,
            conversationId
        })
    }

  return (
    <div
        className='
            py-4
            px-4
            bg-white
            border-t
            flex
            items-center
            gap-2
            lg:gap-4
            w-full
        '
    >
        <CldUploadButton
            options={{maxFiles:1}}
            onUpload={handleUpload}
            uploadPreset='qieok4oj'
        >
        <HiPhoto size={30} className='text-gray-600'/>
        </CldUploadButton>
        <form 
            onSubmit={handleSubmit(onSubmit)}
            
            className='
                flex
                items-center 
                gap-2 
                lg:gap-4
                w-full
            '
        >
            <MessageInput 
                id='message'
                register={register}
                errors={errors}
                required
                placeholder="Write a message"
                
            />
            <button 
                type='submit'
                className='
                    rounded-full
                    p-2
                    bg-neutral-100
                    cursor-pointer
                    hover:bg-gray-300
                    transition
                    
                '
            >
                <HiPaperAirplane 
                    size={25}
                    className='text-gray-500 rotate-[-40deg] hover:text-gray-600'
                />

            </button>

        </form>
    </div>
  )
}

export default Form