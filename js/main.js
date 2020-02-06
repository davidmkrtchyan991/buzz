$(document).ready(function() {
    let menuList = [
        {
            "id": 1,
            "name": "Cover",
            "items": [
                {
                    "src": "https://assets.tildacdn.com/files/tplsthumbs_new/tpl_018n.png",
                    "code": "CR01",
                    "desc": "Cover with title, subtitle, and upper note",
                    "subdesc": "image or video background"
                },
                {
                    "src": "https://assets.tildacdn.com/files/tplsthumbs_new/tpl_014n.png",
                    "code": "CR02",
                    "desc": "Cover with title and description",
                    "subdesc": "image or video background"},
                {
                    "src": "https://assets.tildacdn.com/files/tplsthumbs_new/tpl_046n.png",
                    "code": "CR03",
                    "desc": "Cover with title and subtitle",
                    "subdesc": "image background"},
            ]
        },
        {
            "id": 2,
            "name": "About",
            "items": [
                {
                    "src": "https://assets.tildacdn.com/files/tplsthumbs_new/tpl_474.png",
                    "code": "AB101",
                    "desc": " Big description",
                    "subdesc": "optional: button"
                },
                {
                    "src": "https://assets.tildacdn.com/files/tplsthumbs_new/tpl_467.png",
                    "code": "AB102",
                    "desc": "Cover with title and description",
                    "subdesc": "image or video background"},
                {
                    "src": "https://assets.tildacdn.com/files/tplsthumbs_new/tpl_468.png",
                    "code": "AB103",
                    "desc": "Cover with title and subtitle",
                    "subdesc": "image background"},
            ]
        },
        {
            "id": 3,
            "name": "Title",
            "items": [
                {
                    "src": "https://assets.tildacdn.com/files/tplsthumbs_new/tpl_60.png",
                    "code": "TL01",
                    "desc": "Cover with title, subtitle, and upper note",
                    "subdesc": "image or video background"
                },
                {
                    "src": "https://assets.tildacdn.com/files/tplsthumbs_new/tpl_30.png",
                    "code": "TL02",
                    "desc": "Cover with title and description",
                    "subdesc": "image or video background"
                },
                {
                    "src": "https://assets.tildacdn.com/files/tplsthumbs_new/tpl_255.png",
                    "code": "TL03",
                    "desc": "Cover with title and subtitle",
                    "subdesc": "image background"
                },
            ]
        },

    ];
    let listBlock = $('.list-block');
    let sublistBlock = $('.sublist');
    let menu = $('.menu');
    let closeMenu = $('.close-menu');
    let moreBlocks = $('.more-blocks');
    let blocks = $('.blocks');
    let constructor = $('.constructor');

    /* Constructor variables */
    let options = [
        {"id": 1, "text": "Cover", "template": "<img class='full-height' src='https://assets.tildacdn.com/files/tplsthumbs_new/tpl_018n.png' alt='preview'"},
        {"id": 2, "text": "Medium Title", "template": "<h5 class='f-1 m-2'>BASICS</h5><h2 class='m2 f-3'>Why typography matters?</h2>"},
        {"id": 3, "text": "Lead", "template": "<h3 class='f-1 m-1 w-1'>Each type of visual aid has pros and cons that must be evaluated to ensure it will be beneficial to the overall presentation. Before incorporating visual aids into speeches, the speaker should understand that if used incorrectly, the visual will not be an aid, but a distraction</h3>"},
        {"id": 4, "text": "Text", "template": "<h3 class='f-1 m-1 w-2'>Front matter, or preliminaries, is the first section of a book, and is usually the smallest section in terms of the number of pages. Each page is counted, but no folio or page number is expressed, or printed, on either display pages or blank pages.</h3>"},
        {"id": 5, "text": "Impact", "template": "<h3 class='f-3 m-1 w-2'>It's very easy to be different, but very difficult to be better</h3>"},
        {"id": 6, "text": "Image", "template": "<h3 class='f-3 m-1 w-2'>It's very easy to be different, but very difficult to be better</h3>"},
        {"id": 7, "text": "Gallery", "template": "<h3 class='f-3 m-1 w-2'>It's very easy to be different, but very difficult to be better</h3>"},
        {"id": 8, "text": "Line", "template": "<h3 class='f-3 m-1 w-2'>It's very easy to be different, but very difficult to be better</h3>"},
    ]

    function drawList(id, name) {
        return `<li class="list-item" data-id="${id}">
                    <p>${name}</p>
                </li>`;
    }

    function drawBlocks(id, name) {
        return `<li class="blocks-item" data-option-id="${id}">
                    <p>${name}</p>
                </li>`;
    }

    function drawSublist(src, code, desc, subdesc) {
        return `<div class="subitem">
                <img class="preview" src="${src}" alt="image">
                <p>
                    <span class="code">${code}</span>
                    <span class="desc">${desc}</span>
                    <span class="subdesc">${subdesc}</span>
                </p>
            </div>`;
    }

    /* Draw list on blocks */
    $.each(options, function(index, value) {
        return blocks.append(drawBlocks(value.id, value.text));
    });

    /* Draw list on document ready */
    $.each(menuList, function(index, value) {
        return listBlock.append(drawList(value.id, value.name));
    });

    /* Listen to click on list */
    $('.list-item').click(function() {
        sublistBlock.empty();
        $('.list-item').removeClass('active');
        $(this).addClass('active');
        let result = menuList.filter(item => {
            return item.id === $(this).data('id')
        })[0];
        $.each(result.items, function(index, value) {
            return sublistBlock.addClass('active').append(drawSublist(value.src, value.code, value.desc, value.subdesc));
        });
        $('.preview').click(function() {
            let result = options.filter(item => {
                return item.id === 1
            })[0];
            result.template = `<img class='full-height' src='${$(this)[0].src}' alt='preview'>`;
            constructor.append(resizableBlock(1));
            initResize();
        });
    })

    /* Menu show / hide */
    moreBlocks.click(function() {
        menu.addClass('active');
    });
    closeMenu.click(function() {
        sublistBlock.removeClass('active').empty();
        $('.list-item').removeClass('active');
        menu.removeClass('active');
    });

    $('.blocks-item').click(function() {
        let self = $(this);
        constructor.append(resizableBlock(self.data('option-id')));
        initResize();

        $('.fa-copy').click(function() {
            constructor.append(resizableBlock(self.data('option-id')));
            initResize();
        });
        $('.fa-trash').click(function() {
            $(this).closest('.resizable-block').remove();
        })
        $('.fa-power-off').click(function() {
            $(this).closest('.resizable-block').animate({'height': 50}, 200).text('Content is hidden');
        })
    })


    function resizableBlock(id) {
        let result = options.filter(item => {
            return item.id == id;
        })[0];
        return `<div class="ui-widget-content resizable resizable-block">
                    <div class="settings">
                        <i class="fa fa-copy"></i>
                        <i class="fa fa-trash"></i>
                        <i class="fa fa-power-off"></i>
                    </div>
                    <div class="resizable-block-content" contenteditable='true'>
                        ${result.template}
                    </div>
                </div>`
    }

    function initResize() {
        $( ".resizable" ).resizable({
            resize: function(event, ui) {
                ui.size.width = ui.originalSize.width;
            }
        });
    }


});