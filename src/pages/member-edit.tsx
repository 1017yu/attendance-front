import React from 'react'
import MemberHeader from '@/components/member/MemberHeader'
import MemberBoard from '@/components/member/MemberBoard'
import MemberSideBar from '@/components/member/MemberSideBar'
import MemberEdit from '@/components/member/MemberEdit'
import MemberInfo from '@/components/member/MemberInfo'

export default function memberedit() {
  return (
    <>
     <MemberHeader />
     <div className='flex mx-24 my-24'>
        <div className='pb-10 mr-20'>
            <MemberBoard />
            <div className='mt-16'>
                <MemberSideBar />
                </div>
        </div>
        <div>

        </div>

        <div className='mr-80'>
            <MemberEdit />
            </div>
            <div>
                <MemberInfo />
            </div>
     </div>
    
    
    </>
  );
}
