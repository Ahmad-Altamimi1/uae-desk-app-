export type ICustomerList = {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  Customer_name: string;
  region_name: string;
  Customer_description: null;
  Customer_date_from: string;
  Customer_date_to: string;
  index_num: number;
  category_name: string;
  cover_img: string;
  show_in_plt: number;
  show_in_mobile: number;
  should_to_do: number;
  is_featured: number;
  working_hours: null;
  location_url: null;
  location_name: null;
  longitude: null;
  latitude: null;
  Customer_name_en: null;
  region_name_en: string;
  category_name_en: string;
  working_hours_en: null;
  Customer_description_en: null;
};

export type ICustomerItem = {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  Customer_name: string;
  region_name: string;
  Customer_description: string;
  Customer_date_from: string;
  Customer_date_to: string;
  index_num: number;
  category_name: string;
  cover_img: string;
  show_in_plt: number;
  show_in_mobile: number;
  should_to_do: 0;
  is_featured: 0;
  working_hours: string;
  location_url: string;
  location_name: string;
  longitude: string;
  latitude: string;
  doctype: string;
  images_list: [
    {
      name: string;
      owner: string;
      creation: string;
      modified: string;
      modified_by: string;
      docstatus: number;
      idx: number;
      image_file: string;
      img_desc: string;
      show_in_plt: number;
      show_in_mobile: number;
      parent: string;
      parentfield: string;
      parenttype: string;
      doctype: string;
    }
  ];
  suitable_categories: [
    {
      name: string;
      owner: string;
      creation: string;
      modified: string;
      modified_by: string;
      docstatus: 0;
      idx: 1;
      suitable: string;
      parent: string;
      parentfield: string;
      parenttype: string;
      doctype: string;
    }
  ];
  _liked_by: [];
};
