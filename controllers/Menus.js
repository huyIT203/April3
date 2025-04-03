let menuModel = require('../schemas/menu');
let { CreateSuccessRes } = require('../utils/responseHandler');

const renderMenu = (menu) => {
    let html = '<ul>';
    html += `<li><a href="${menu.url}">${menu.text}</a>`;
    if (menu.children && menu.children.length > 0) {
        for (let child of menu.children) {
            html += renderMenu(child);  // Đệ quy hiển thị các menu con
        }
    }
    html += '</li></ul>';
    return html;
};

// Lấy menu theo cấu trúc cha-con và trả về dưới dạng HTML
exports.getMenu = async function(req, res, next) {
    try {
        let menus = await menuModel.find({ parent: null });  // Lấy các menu cha

        // Hàm đệ quy để lấy các menu con
        const getMenuWithChildren = async (menu) => {
            let children = await menuModel.find({ parent: menu._id });
            menu.children = children;
            for (let child of children) {
                await getMenuWithChildren(child);
            }
            return menu;
        };

        let result = [];
        for (let menu of menus) {
            result.push(await getMenuWithChildren(menu));  // Tạo cấu trúc menu cha-con
        }

        // Tạo HTML cho menu
        let htmlOutput = '';
        result.forEach(menu => {
            htmlOutput += renderMenu(menu);
        });

        // Trả về HTML
        res.send(htmlOutput);  // Hiển thị HTML trong Postman
    } catch (error) {
        next(error);
    }
};

exports.createMenu = async function(req, res, next) {
    try {
        let { text, url, parent } = req.body;  // Lấy dữ liệu từ body request

        // Kiểm tra nếu có parent thì truyền ID của menu cha
        let newMenu = new menuModel({
            text: text,
            url: url,
            parent: parent || null   // Nếu không có parent thì mặc định là null
        });

        await newMenu.save();  // Lưu menu mới vào DB

        CreateSuccessRes(res, newMenu, 201);  // Trả về thông báo thành công
    } catch (error) {
        next(error);
    }
};