import { Chat } from './_models/chat';

export const Data: Chat[] = [
    {
        id: 1,
        name: 'Đào Đức Khiêm',
        lastMesseage: 'Chiều 4h anh Hưng training nhé',
        lastTime: new Date('Friday 2020/07/03 10:04:00'),
        avt: './../../../assets/IMG/Avatar/1.jpg',
        amoutNewMesseage: 4,
        seenStatus: 1,
        phone: '0986789123',
        email: 'daoduckhiem@gmail.com',
        isActive: true,
        listMesseage: [
            {
                id: 1,
                content: 'Hội nghị lãnh đạo vừa qua! Hội lãnh đạo vừa qua! Hội nghị lãnh đạo vừa qua! Hội nghị lãnh đạo vừa qua! Hội nghị lãnh đạo vừa qua!',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: false
            },
            {
                id: 2,
                content: 'Đã thống nhất',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: false
            },
            {
                id: 3,
                content: 'Thế giới Hội nghị lãnh đạo vừa qua! Hội lãnh đạo vừa qua! Hội nghị lãnh đạo vừa qua! Hội nghị lãnh đạo vừa qua! Hội nghị lãnh đạo vừa qua!',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: true
            },
            {
                id: 4,
                content: 'Hom nay co di lam khong',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: true
            },
            {
                id: 5,
                content: 'Hom nay co di lam khong',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: false
            },
            {
                id: 6,
                content: 'https://1.bp.blogspot.com/-tsOrgcfBCP0/Xb-Me9pmc9I/AAAAAAAASps/dooS64jTRbQpYTU83GdTUl3MJP09nKXVACLcBGAsYHQ/s1600/Hinh-anh-hoa-dep-nhat-Wap102%2B%25283%2529.jpg',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'image',
                fromMe: true
            },
            {
                id: 8,
                content: 'PPTX.pptx',
                time: new Date('Friday 2020/07/03 10:04:00'),
                typeofFile: 'pptx',
                type: 'file',
                fromMe: false
            },
            {
                id: 9,
                content: 'PDF.pdf',
                time: new Date('Friday 2020/07/03 10:04:00'),
                typeofFile: 'pdf',
                type: 'file',
                fromMe: false
            },
            {
                id: 10,
                content: 'Word.doc',
                time: new Date('Friday 2020/07/03 10:04:00'),
                typeofFile: 'docx',
                type: 'file',
                fromMe: false
            },
            {
                id: 11,
                content: 'https://images.pexels.com/users/avatars/3654/dufau-paul-945.jpeg?w=256&h=256&fit=crop&crop=faces&auto=compress',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'image',
                fromMe: true
            },
            {
                id: 12,
                content: 'data:image/jpeg;base64,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',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'image',
                fromMe: false
            },
            {
                id: 13,
                content: 'https://i.pinimg.com/originals/c1/dd/32/c1dd3201aef7acec7f1783e835cc0ee9.jpg',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'image',
                fromMe: true
            },
            {
                id: 14,
                content: 'Chiều 4h anh Hưng trainning nhé!',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: false
            }
        ]
    },
    {
        id: 2,
        name: 'Trần Hải Dương',
        lastMesseage: 'Hôm nay có đi làm không',
        lastTime: new Date('2019/07/02 21:04:00'),
        avt: './../../../assets/IMG/Avatar/2.jpg',
        amoutNewMesseage: 0,
        seenStatus: 0,
        phone: '09867891456',
        email: 'tranhaiduong@gmail.com',
        isActive: false,
        listMesseage: [
            {
                id: 1,
                content: 'Hội nghị lãnh đạo vừa qua!',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: false
            },
            {
                id: 2,
                content: 'Đã thống nhất',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: false
            },
            {
                id: 3,
                content: 'Thế giới Hội nghị lãnh đạo vừa qua!',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: true
            },
            {
                id: 4,
                content: 'Hom nay co di lam khong',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: true
            },
            {
                id: 5,
                content: 'Hom nay co di lam khong',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: false
            },
            {
                id: 6,
                content: 'Tep tin pdf',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'file',
                fromMe: true
            },
            {
                id: 7,
                content: 'PDF.dpf',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'file',
                fromMe: false
            },
            {
                id: 8,
                content: 'https://images.pexels.com/users/avatars/3654/dufau-paul-945.jpeg?w=256&h=256&fit=crop&crop=faces&auto=compress',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'image',
                fromMe: true
            },
            {
                id: 9,
                content: 'Hôm nay có đi làm không',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: false
            }
        ]
    },
    {
        id: 3,
        name: 'Đỗ Đức Dũng',
        lastMesseage: 'Hom nay co di lam khong',
        lastTime: new Date('Wednesday 2020/07/01 10:04:00'),
        avt: './../../../assets/IMG/Avatar/3.jpg',
        amoutNewMesseage: 5,
        seenStatus: 1,
        phone: '09867891456',
        email: 'doducdung@gmail.com',
        isActive: true,
        listMesseage: [
            {
                id: 1,
                content: 'Hội nghị lãnh đạo vừa qua! Hội lãnh đạo vừa qua! Hội nghị lãnh đạo vừa qua! Hội nghị lãnh đạo vừa qua! Hội nghị lãnh đạo vừa qua!',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: false
            },
            {
                id: 2,
                content: 'Đã thống nhất',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: false
            },
            {
                id: 3,
                content: 'Thế giới Hội nghị lãnh đạo vừa qua! Hội lãnh đạo vừa qua! Hội nghị lãnh đạo vừa qua! Hội nghị lãnh đạo vừa qua! Hội nghị lãnh đạo vừa qua!',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: true
            },
            {
                id: 4,
                content: 'Hom nay co di lam khong',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: true
            },
            {
                id: 5,
                content: 'Hom nay co di lam khong',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: false
            },
            {
                id: 6,
                content: 'https://1.bp.blogspot.com/-tsOrgcfBCP0/Xb-Me9pmc9I/AAAAAAAASps/dooS64jTRbQpYTU83GdTUl3MJP09nKXVACLcBGAsYHQ/s1600/Hinh-anh-hoa-dep-nhat-Wap102%2B%25283%2529.jpg',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'image',
                fromMe: true
            },
            {
                id: 7,
                content: 'PDF.dpf',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'file',
                fromMe: false
            },
            {
                id: 8,
                content: 'https://images.pexels.com/users/avatars/3654/dufau-paul-945.jpeg?w=256&h=256&fit=crop&crop=faces&auto=compress',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'image',
                fromMe: true
            },
            {
                id: 9,
                content: 'data:image/jpeg;base64,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',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'image',
                fromMe: false
            },
            {
                id: 10,
                content: 'https://i.pinimg.com/originals/c1/dd/32/c1dd3201aef7acec7f1783e835cc0ee9.jpg',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'image',
                fromMe: true
            },
            {
                id: 11,
                content: 'Hom nay co di lam khong',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: false
            }
        ]
    },
    {
        id: 4,
        name: 'Nguyễn Văn Thế',
        lastMesseage: 'Ok',
        lastTime: new Date('Tuesday 2020/06/30 10:04:00'),
        avt: './../../../assets/IMG/Avatar/4.jpg',
        amoutNewMesseage: 0,
        seenStatus: 0,
        phone: '0986789123',
        email: 'nguyenvanthe@gmail.com',
        isActive: false,
        listMesseage: [
            {
                id: 1,
                content: 'Hội nghị lãnh đạo vừa qua! Hội lãnh đạo vừa qua! Hội nghị lãnh đạo vừa qua! Hội nghị lãnh đạo vừa qua! Hội nghị lãnh đạo vừa qua!',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: false
            },
            {
                id: 2,
                content: 'Đã thống nhất',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: false
            },
            {
                id: 3,
                content: 'Thế giới Hội nghị lãnh đạo vừa qua! Hội lãnh đạo vừa qua! Hội nghị lãnh đạo vừa qua! Hội nghị lãnh đạo vừa qua! Hội nghị lãnh đạo vừa qua!',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: true
            },
            {
                id: 4,
                content: 'Hom nay co di lam khong',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: true
            },
            {
                id: 5,
                content: 'Hom nay co di lam khong',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: false
            },
            {
                id: 6,
                content: 'https://1.bp.blogspot.com/-tsOrgcfBCP0/Xb-Me9pmc9I/AAAAAAAASps/dooS64jTRbQpYTU83GdTUl3MJP09nKXVACLcBGAsYHQ/s1600/Hinh-anh-hoa-dep-nhat-Wap102%2B%25283%2529.jpg',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'image',
                fromMe: true
            },
            {
                id: 7,
                content: 'PDF.dpf',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'file',
                fromMe: false
            },
            {
                id: 8,
                content: 'https://images.pexels.com/users/avatars/3654/dufau-paul-945.jpeg?w=256&h=256&fit=crop&crop=faces&auto=compress',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'image',
                fromMe: true
            },
            {
                id: 9,
                content: 'data:image/jpeg;base64,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',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'image',
                fromMe: false
            },
            {
                id: 10,
                content: 'https://i.pinimg.com/originals/c1/dd/32/c1dd3201aef7acec7f1783e835cc0ee9.jpg',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'image',
                fromMe: true
            }
            ,
            {
                id: 10,
                content: 'OK',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: true
            }
        ]
    },
    {
        id: 5,
        name: 'Nguyễn Thế Nam',
        lastMesseage: 'Đi seminar đi',
        lastTime: new Date('2016-01-05T09:05:05.035Z'),
        avt: './../../../assets/IMG/Avatar/5.jpg',
        amoutNewMesseage: 4,
        seenStatus: 1,
        phone: '0986789123',
        email: 'daoduckhiem@gmail.com',
        isActive: true,
        listMesseage: [
            {
                id: 1,
                content: 'Hội nghị lãnh đạo vừa qua! Hội lãnh đạo vừa qua! Hội nghị lãnh đạo vừa qua! Hội nghị lãnh đạo vừa qua! Hội nghị lãnh đạo vừa qua!',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: false
            },
            {
                id: 2,
                content: 'Đã thống nhất',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: false
            },
            {
                id: 3,
                content: 'Thế giới Hội nghị lãnh đạo vừa qua! Hội lãnh đạo vừa qua! Hội nghị lãnh đạo vừa qua! Hội nghị lãnh đạo vừa qua! Hội nghị lãnh đạo vừa qua!',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: true
            },
            {
                id: 4,
                content: 'Hom nay co di lam khong',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: true
            },
            {
                id: 5,
                content: 'Hom nay co di lam khong',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: false
            },
            {
                id: 6,
                content: 'https://1.bp.blogspot.com/-tsOrgcfBCP0/Xb-Me9pmc9I/AAAAAAAASps/dooS64jTRbQpYTU83GdTUl3MJP09nKXVACLcBGAsYHQ/s1600/Hinh-anh-hoa-dep-nhat-Wap102%2B%25283%2529.jpg',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'image',
                fromMe: true
            },
            {
                id: 7,
                content: 'PDF.dpf',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'file',
                fromMe: false
            },
            {
                id: 8,
                content: 'https://images.pexels.com/users/avatars/3654/dufau-paul-945.jpeg?w=256&h=256&fit=crop&crop=faces&auto=compress',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'image',
                fromMe: true
            },
            {
                id: 9,
                content: 'data:image/jpeg;base64,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',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'image',
                fromMe: false
            },
            {
                id: 10,
                content: 'https://i.pinimg.com/originals/c1/dd/32/c1dd3201aef7acec7f1783e835cc0ee9.jpg',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'image',
                fromMe: true
            },
            {
                id: 1,
                content: 'Đi seminar đi',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: false
            }
        ]
    },
    {
        id: 6,
        name: 'Nguyễn Tiến Thành',
        lastMesseage: 'Hôm nay đi nhậu nhé',
        lastTime: new Date('2016-01-05T10:05:05.035Z'),
        avt: './../../../assets/IMG/Avatar/2.jpg',
        amoutNewMesseage: 0,
        seenStatus: 0,
        phone: '0986789123',
        email: 'daoduckhiem@gmail.com',
        listMesseage: [
            {
                id: 1,
                content: 'Hội nghị lãnh đạo vừa qua! Hội lãnh đạo vừa qua! Hội nghị lãnh đạo vừa qua! Hội nghị lãnh đạo vừa qua! Hội nghị lãnh đạo vừa qua!',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: false
            },
            {
                id: 2,
                content: 'Đã thống nhất',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: false
            },
            {
                id: 3,
                content: 'Thế giới Hội nghị lãnh đạo vừa qua! Hội lãnh đạo vừa qua! Hội nghị lãnh đạo vừa qua! Hội nghị lãnh đạo vừa qua! Hội nghị lãnh đạo vừa qua!',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: true
            },
            {
                id: 4,
                content: 'Hom nay co di lam khong',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: true
            },
            {
                id: 5,
                content: 'Hom nay co di lam khong',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: false
            },
            {
                id: 6,
                content: 'https://1.bp.blogspot.com/-tsOrgcfBCP0/Xb-Me9pmc9I/AAAAAAAASps/dooS64jTRbQpYTU83GdTUl3MJP09nKXVACLcBGAsYHQ/s1600/Hinh-anh-hoa-dep-nhat-Wap102%2B%25283%2529.jpg',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'image',
                fromMe: true
            },
            {
                id: 7,
                content: 'PDF.dpf',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'file',
                fromMe: false
            },
            {
                id: 8,
                content: 'Hôm nay đi nhậu nhé',
                time: new Date('Friday 2020/07/03 10:04:00'),
                type: 'text',
                fromMe: false
            }
        ]
    }
];