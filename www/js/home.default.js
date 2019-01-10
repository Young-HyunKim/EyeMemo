var NowTime = new Date();
var count = 0;
var CDES_count = 0;
var CD_WeekofDay = 0;
var N_Subject_Name = "의학용어";

var S_Code = "";
var S_Name = "";
var Color_Code = "";

var Subject_List_Code = new Array();

$(document).ready(function () {
    for (var i = 0; i < Sub_Add_Limit; i++) {
        Subject_List_Code[i] = "";
        console.log("Subject_List_Code : " + Subject_List_Code[i]);
    }
});

myApp.onPageInit("home-default", function (page) {


    $(document).ready(function () {
        $("#btn-table").css("margin", "0 auto");
        $$("#Subject-Null").css('border', 'solid #E21830');

    });


    $("#SN").css("margin", "0 auto");
    $("#note").css("margin", "0 auto");
    $("#scanner").css("margin", "0 auto");
    $("#timer").css("margin", "0 auto");

    $("#Subject-Null").css('border', 'solid #E21830');
    $("#Note-Null").css('border', 'solid #E21830');
    $("#Pic-Null").css('border', 'solid #E21830');


    $('#Note_List').slimScroll({
        height: '280px'
    });

    $('#Pic_List').slimScroll({
        height: '210px'
    });

    $('#MediaList').slimScroll({
        height: '360px'
    });

    $('#Subject-List').slimScroll({
        height: '360px'
    });


    $$('#btnSearch').on('click', function () {
        Search();
    });

    $$('#btn_schedule').on('click', function () {
        showHomeTabSchedule();
    });

    $$('#btn_home').on('click', function () {
        showHomeTabMain();
    });

    $$('#btn_folder').on('click', function () {
        showHomeTabFolder();
    });

    $$('#btn_setting').on('click', function () {
        showHomeTabsetting();
    });


    function ContnetSet() {
        var Today = new Date();
        CD_WeekofDay = Today.getDay();

        switch (CD_WeekofDay) {
            case 1: CD_WeekofDay = '월요일';
                break;

            case 2: CD_WeekofDay = '화요일';
                break;

            case 3: CD_WeekofDay = '수요일';
                break;

            case 4: CD_WeekofDay = '목요일';
                break;

            case 5: CD_WeekofDay = '금요일';
                break;

            case 6: CD_WeekofDay = '토요일';
                break;

            case 0: CD_WeekofDay = '일요일';
                break;

        }

        $$("#CurrentWeekOfDay").text(" " + CD_WeekofDay);
        $$("#CurrentDate").text(Today.toLocaleDateString());
        $$("#CurrentTime").text(Today.toLocaleTimeString());
    }


    function CurrentDateTime() {

        var html = "";

        html += "<div class='content-block'>"
            + "<p style='text-align: center; margin-bottom: -5px; margin-top: 10px;'>"
            + "<span id='CurrentDate'> </span>"

            + "<span id='CurrentWeekOfDay'> </span><br>"
            + "</p>"
            + "<h1 style='text-align: center; margin-top: -5px; margin-bottom: 5px;'>"
            + "<span id='CurrentTime'> </span>"
            + "</h1>"
            + "</div>";

        $$("#Now_CDT").show();
        $$("#Now_CDT").append(html);

        $("#Now_CDT").css('border', 'solid #E21830');

    }

    $$('#Search_Subject').on('click', function () {
        N_Subject_Name = $$("#keyword").val();
        console.log("검색 과목명 : " + N_Subject_Name);
        Select_Notes();
    });
});




function showHomeTabSchedule() {
    $$("#btn_schedule").addClass('about-color').addClass('color-red');    //about-color : 탭 색상, color-brown : 탭 글자 색상
    $$("#btn_home").removeClass('about-color').removeClass('color-red');
    $$("#btn_folder").removeClass('about-color').removeClass('color-red');
    $$("#btn_portal").removeClass('about-color').removeClass('color-red');
    $$("#btn_setting").removeClass('about-color').removeClass('color-red');
}

function showHomeTabMain() {
    $$("#btn_home").addClass('about-color').addClass('color-red');    //about-color : 탭 색상, color-brown : 탭 글자 색상
    $$("#btn_schedule").removeClass('about-color').removeClass('color-red');
    $$("#btn_folder").removeClass('about-color').removeClass('color-red');
    $$("#btn_portal").removeClass('about-color').removeClass('color-red');
    $$("#btn_setting").removeClass('about-color').removeClass('color-red');
}

function showHomeTabFolder() {
    $$("#btn_folder").addClass('about-color').addClass('color-red');    //about-color : 탭 색상, color-brown : 탭 글자 색상
    $$("#btn_schedule").removeClass('about-color').removeClass('color-red');
    $$("#btn_home").removeClass('about-color').removeClass('color-red');
    $$("#btn_portal").removeClass('about-color').removeClass('color-red');
    $$("#btn_setting").removeClass('about-color').removeClass('color-red');
}

function showHomeTabsetting() {
    $$("#btn_setting").addClass('about-color').addClass('color-red');    //about-color : 탭 색상, color-brown : 탭 글자 색상
    $$("#btn_schedule").removeClass('about-color').removeClass('color-red');
    $$("#btn_folder").removeClass('about-color').removeClass('color-red');
    $$("#btn_portal").removeClass('about-color').removeClass('color-red');
    $$("#btn_home").removeClass('about-color').removeClass('color-red');
}


function Current_SelectSubject() {
    
};


function Select_Notes() {
    $('#Note-Null').hide();
    $('#Pic-Null').hide();
    db.transaction(function (tr) {


        var selectSQL = 'select notes, subject_name from Private_Storage where subject_name = ? ';

        tr.executeSql(selectSQL, [N_Subject_Name], function (tr, rs) {
            console.log(rs.rows.item(0).subject_name + " 노트 검색")
            console.log("노트 내용 : " + rs.rows.item(0).notes)
            console.log("검색 과목 : " + N_Subject_Name)


            for (var i = 0; i < rs.rows.length; i++) {
                $$("#Notes").show();
                $$("#Subject-Note-" + i).remove(html);

                var html = "";

                html += "<div class='card' id='Subject-Note-" + i + "' style= 'margin: 30px;'>"
                    + "<div class='content-block' style= 'padding-top: 20px; padding-bottom: 30px;'>"
                    + "<h3 style='text-align: center; margin-bottom: -5px; margin-top: 10px;'>"
                    + rs.rows.item(i).notes
                    + "</h3>"
                    + "</div>"
                    + "</div>";

                $$("#Notes").show();
                $$("#Notes").append(html);

                $("#Subject-Note-" + i).css('border', 'solid #E21830');

            }

        }, function (tr, err) {
            alert('DB오류 ' + err.message + err.code);
        }
        );
    });
}



$(document).ready(function () {
   
});


function SelectScheduleList() {
    var html = "";

    html += "<div class='card' id='Schedule-Card-" + 1 + "' style= 'margin: 30px; color:" + Color_Code + ";'>"
        + "<div class='content-block' style= 'padding-top: 30px; padding-bottom: 30px;'>"
        + "<p style='text-align: center; margin-bottom: -5px; margin-top: 10px;'>"
        + "<span>" + ((9) + "시 00분 ~ " + (9) + "시 50분") + "</span><br>"
        + "</p>"

        + "<h2 style='text-align: center; margin-top: -5px; margin-bottom: 5px;'>"
        + "<span id='Subject-Name-" + 1 + "'>" + Subject_List_Code_1 + "</span>"
        + "</h1>"
        + "</div>"
        + "</div>";

    $$("#Today_Subject").show();
    $$("#Today_Subject").append(html);

    $("#" + "Schedule-Card-" + 1).css('border', 'solid ' + Color_Code);

}

var Subject_List_Code = new Array();

function set_Color(CDES) {
    switch (CDES) {

        case 1: Color_Code = '#FF0000';
            break;

        case 2: Color_Code = '#0054FF';
            break;

        case 3: Color_Code = '#FF007F';
            break;

        case 4: Color_Code = '#ABF200';
            break;

        case 5: Color_Code = '#FFE400';
            break;

        case 6: Color_Code = '#b162ff';
            break;

        case 7: Color_Code = '#e564e5;';
            break;

        case 8: Color_Code = '#ff56ab;';
            break;

        case 9: Color_Code = '#ff9f19;';
            break;

        case 10: Color_Code = '#ebc50b';
            break;

        case 11: Color_Code = '#e6d739';
            break;

        case 12: Color_Code = "#74d941";
            break;

        case 13: Color_Code = "#9fc93c";
            break;

        default: Color_Code = "#fff";
    }
}
