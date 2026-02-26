// ui
import MyIcon from '../../atom/icon-components';

// data
import { TECH_STACK } from './data';

const WorkflowComponent = () => {
  return (
    <div className="border-y border-gray-100 bg-white py-[32px]">
      <div className="mx-auto max-w-[90vw] px-4 text-center">
        <p className="mb-[48px] text-subtitle font-semibold text-gray-700 lg:text-title">
          Powering the Modern Engineering Workflow
        </p>

        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-5 lg:justify-center lg:gap-x-12 lg:gap-y-10">
          {TECH_STACK.map((tech, index) => (
            <div
              key={index}
              className={`flex cursor-default items-center gap-3`}
            >
              <MyIcon
                icon={tech.icon}
                className={'font-black text-gray-500 lg:text-subtitle'}
              />

              <span
                className={
                  'whitespace-nowrap font-black text-gray-500 lg:text-subtitle'
                }
              >
                {tech.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkflowComponent;
