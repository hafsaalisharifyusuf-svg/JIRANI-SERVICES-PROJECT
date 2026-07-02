import React from 'react';

const SkillTag = ({ skill }) => {
  return (
    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium">
      {skill}
    </span>
  );
};

export default SkillTag;