export const docs = {
  info: {
    _postman_id: "f909820e-c332-4e4e-9155-8b072c3aedd3",
    name: "New Collection",
    schema:
      "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
  },
  item: [
    {
      name: "add_course",
      request: {
        method: "POST",
        header: [],
        body: {
          mode: "raw",
          raw: '{\n    "title": "h39100gghfgf00ihdfgf72i",\n    "description": "8hihwdfsg isfgafasdfsdfgsdsafsgfs k5vhah6a1"\n}',
          options: {
            raw: {
              language: "json",
            },
          },
        },
        url: {
          raw: "http://localhost:5000/api/v1/courses",
          protocol: "http",
          host: ["localhost"],
          port: "5000",
          path: ["api", "v1", "courses"],
        },
      },
      response: [],
    },
    {
      name: "get_all_courses",
      protocolProfileBehavior: {
        disableBodyPruning: true,
      },
      request: {
        method: "GET",
        header: [],
        body: {
          mode: "raw",
          raw: '{\n      "params": {\n        "_page": 1,\n        "_limit": 10\n      }\n    }',
          options: {
            raw: {
              language: "json",
            },
          },
        },
        url: {
          raw: "http://localhost:5000/api/v1/courses",
          protocol: "http",
          host: ["localhost"],
          port: "5000",
          path: ["api", "v1", "courses"],
        },
      },
      response: [],
    },
    {
      name: "get_course",
      request: {
        method: "GET",
        header: [],
        url: {
          raw: "http://localhost:5000/apiv1/courses/60db1cc0d029bad459af3bf1",
          protocol: "http",
          host: ["localhost"],
          port: "5000",
          path: ["apiv1", "courses", "60db1cc0d029bad459af3bf1"],
        },
      },
      response: [],
    },
    {
      name: "update_course",
      request: {
        method: "PATCH",
        header: [],
        body: {
          mode: "raw",
          raw: '{\n        "_id": "60db1cc0d029bad459af3bf1",\n        "title": "hihi",\n        "description": "hihi is hahahahahahahahahaha"\n    }',
          options: {
            raw: {
              language: "json",
            },
          },
        },
        url: {
          raw: "http://localhost:5000/apiv1/courses/60db1cc0d029bad459af3bf1",
          protocol: "http",
          host: ["localhost"],
          port: "5000",
          path: ["apiv1", "courses", "60db1cc0d029bad459af3bf1"],
        },
      },
      response: [],
    },
    {
      name: "delete_course",
      request: {
        method: "DELETE",
        header: [],
        url: {
          raw: "http://localhost:5000/api/v1/courses/60db1cc0d029bad459af3bf1",
          protocol: "http",
          host: ["localhost"],
          port: "5000",
          path: ["api", "v1", "courses", "60db1cc0d029bad459af3bf1"],
        },
      },
      response: [],
    },
    {
      name: "create_commic",
      request: {
        method: "POST",
        header: [],
        body: {
          mode: "raw",
          raw: '{\n    "name" : "vo-luyen-dinh-phong",\n    "another_name": "None",\n    "author": "Shi Garetto - HIRABUKI Masahiro",\n    "genres": ["Action", "Fantasy"],\n    "rate": 3.2,\n    "subcribe": 100,\n    "description": "Một anh thanh niên trẻ vô tình bị kẹt ở trong khe hở không gian và bị dịch chuyển đến một thế giới khác. Vị thần của thế giới đó ban cho anh ta sức mạnh thần thánh và một số đồ chơi để sống sót, bao gồm cả việc lướt face, xem youtube và tra google. Khi nhân vật chính nhìn thấy nơi đây không có luật lệ mà chỉ có luật rừng, anh ấy quyết tâm dùng sức mạnh của mình để thay đổi điều đó.",\n    "chapters": [\n        {\n            "chapter_number": 1,\n            "chapter_name": "haha",\n            "chapter_imgs": [\n                "https://i3.wp.com/timtruyen.net/images/menu-icon.jpg", \n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/001.jpg", \n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/002.jpg",\n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/003.jpg",\n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/004.jpg",\n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/005.jpg",\n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/006.jpg",\n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/007.jpg",\n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/008.jpg",\n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/009.jpg",\n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/010.jpg",\n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/011.jpg",\n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/012.jpg"\n                ],\n            "views": 10000\n        },\n        {\n            "chapter_number": 2,\n            "chapter_name": "chapter-1312",\n            "chapter_imgs": [\n                "https://i3.wp.com/timtruyen.net/images/menu-icon.jpg", \n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/001.jpg", \n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/002.jpg",\n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/003.jpg",\n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/004.jpg",\n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/005.jpg",\n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/006.jpg",\n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/007.jpg",\n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/008.jpg",\n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/009.jpg",\n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/010.jpg",\n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/011.jpg",\n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/012.jpg"\n                ],\n            "views": 100\n        },\n        {\n            "chapter_number": 3,\n            "chapter_name": "/timtruyen.net/truyen-tranh/vo-luyen-dinh-phong/chapter-1311",\n            "chapter_imgs": [\n                "https://i3.wp.com/timtruyen.net/images/menu-icon.jpg", \n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/001.jpg", \n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/002.jpg",\n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/003.jpg",\n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/004.jpg",\n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/005.jpg",\n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/006.jpg",\n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/007.jpg",\n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/008.jpg",\n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/009.jpg",\n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/010.jpg",\n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/011.jpg",\n                "https://i0.wp.com/truyenmot.com/data/images/17696/734588/012.jpg"\n                ],\n            "views": 100\n        }\n    ]\n}',
          options: {
            raw: {
              language: "json",
            },
          },
        },
        url: {
          raw: "http://localhost:5000/api/v1/commics",
          protocol: "http",
          host: ["localhost"],
          port: "5000",
          path: ["api", "v1", "commics"],
        },
      },
      response: [],
    },
    {
      name: "get_all_commic",
      request: {
        method: "GET",
        header: [],
        url: null,
      },
      response: [],
    },
    {
      name: "get_chapter",
      protocolProfileBehavior: {
        disableBodyPruning: true,
      },
      request: {
        method: "GET",
        header: [],
        body: {
          mode: "raw",
          raw: "",
          options: {
            raw: {
              language: "json",
            },
          },
        },
        url: {
          raw: "http://localhost:5000/api/v1/commic/60f56cfa4a9b9d39f6366b5f/chapter/1",
          protocol: "http",
          host: ["localhost"],
          port: "5000",
          path: [
            "api",
            "v1",
            "commic",
            "60f56cfa4a9b9d39f6366b5f",
            "chapter",
            "1",
          ],
        },
      },
      response: [],
    },
    {
      name: "get_commic",
      request: {
        method: "GET",
        header: [],
        url: null,
      },
      response: [],
    },
    {
      name: "search_commic",
      request: {
        method: "GET",
        header: [],
        url: null,
      },
      response: [],
    },
    {
      name: "signup",
      request: {
        method: "POST",
        header: [],
        body: {
          mode: "raw",
          raw: '{\n    "username": "hahunavth3",\n    "email": "a@b.cde",\n    "password": "hahaha",\n    "roles": ["admin"]\n}\n',
          options: {
            raw: {
              language: "json",
            },
          },
        },
        url: {
          raw: "http://localhost:5000/api/v1/auth/signup",
          protocol: "http",
          host: ["localhost"],
          port: "5000",
          path: ["api", "v1", "auth", "signup"],
        },
      },
      response: [],
    },
    {
      name: "signin",
      request: {
        method: "GET",
        header: [],
        url: null,
      },
      response: [],
    },
    {
      name: "data_admin",
      request: {
        method: "GET",
        header: [],
        url: null,
      },
      response: [],
    },
    {
      name: "data_user",
      request: {
        method: "GET",
        header: [],
        url: null,
      },
      response: [],
    },
    {
      name: "upload_image",
      request: {
        method: "GET",
        header: [],
        url: null,
      },
      response: [],
    },
    {
      name: "get_all_file",
      request: {
        method: "GET",
        header: [],
        url: null,
      },
      response: [],
    },
    {
      name: "get_single_file",
      request: {
        method: "GET",
        header: [],
        url: null,
      },
      response: [],
    },
    {
      name: "delete_file",
      request: {
        method: "GET",
        header: [],
        url: null,
      },
      response: [],
    },
  ],
};
