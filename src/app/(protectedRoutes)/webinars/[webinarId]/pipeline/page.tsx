import { getWebinarAttendance } from '@/actions/attendance';
import PageHeader from '@/components/ReusableComponents/PageHeader';
import { AttendedTypeEnum } from '@prisma/client';
import { AlignLeft, HomeIcon, Users } from 'lucide-react';
import React from 'react';
import PipelineLayout from './_components/PipelineLayout';
import { formatColumnTitle } from './_components/utils';

type Props = {
  params: Promise<{
    webinarId: string;
  }>;
};

const Pipeline = async ({ params }: Props) => {
  const { webinarId } = await params;

  const pipelineData = await getWebinarAttendance(webinarId);

  if (!pipelineData.data) {
    return (
      <div className='text-3xl h-[400px] flex justify-center items-center'>
        No Pipelines Found
      </div>
    );
  }

  return (
    <div className='w-full flex flex-col gap-8'>
      <PageHeader
        leftIcon={<Users className='w-3 h-3' />}
        mainIcon={<AlignLeft className='w-12 h-12' />}
        rightIcon={<HomeIcon className='w-4 h-4' />}
        heading='Keep track of all your customers'
        placeholder='Search name, tag or email'
      />

      <div className='flex overflow-x-auto pb-4 gap-4 md:gap-6'>
        {Object.entries(pipelineData.data).map(([columnType, columnData]) => (
          <PipelineLayout
            key={columnType}
            title={formatColumnTitle(columnType as AttendedTypeEnum)}
            count={columnData.count}
            users={columnData.users}
            tags={pipelineData.webinarTags}
          />
        ))}
      </div>
    </div>
  );
};

export default Pipeline;
