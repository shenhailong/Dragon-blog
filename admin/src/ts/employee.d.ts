export interface employee {
  createdAt: string;
  department: {
    id: number;
    name: string;
  };
  departmentId: number;
  email: string;
  extNumber: string | number;
  id: number;
  name: string;
  remark: string;
  sex: boolean;
  subdepartment: {
    id: number;
    name: string;
  };
  subdepartmentId: number;
  title: {
    id: number;
    name: string;
  };
  titleId: number;
  updatedAt: string;
}


// 部门
export interface department {
 id: number;
 name: string;
 pid: number;
}

// 职务
export interface title {
  id: number;
  name: string;
  departmentId: number
}

// 详情
export interface detail {
  id: number;
  name: string;
  department: department;
  title: title
}

export interface editData {
  departmentId: number
  email: string
  extNumber: string
  name: string
  remark: string
  sex: boolean
  titleId: number
}
