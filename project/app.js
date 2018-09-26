$(document).ready(function() {
    
    let selectedRow = "";
    showEmployeeData();
    
    // DISPLAY LIST OF EMPLOYEES
    $('#viewLink').click(function() {
        selectedRow = "";
        $("#updateDelete").show();
        hideAll();
        showEmployeeData();
    });

    // DISPLAY FORM FOR ADDING NEW EMPLOYEE TO LIST
    $("#addLink").click(function(){
        selectedRow = "";
        hideAllAndShow("#addDiv");
    });

    // VERIFY AN EMPLOYEE EXISTS IN LIST
    $("#verifyLink").click(function(){
        hideAllAndShow("#verifyDiv");
    });

    // UPDATE FORM FOR CHANGING EXISTING EMPLOYEE INFO
    $("#updateLink").click(function(){

        if (selectedRow == "") {
           alert("You must first select a row to update");
        }
        else {
            hideAllAndShow("#updateDiv");
            // POPULATE FORM FIELDS FROM EXISTING SELECTED ROW
            $("#updatedName").val(employeeList[selectedRow.id].name);
            $("#updatedOfficeNum").val(employeeList[selectedRow.id].officeNum);
            $("#updatedPhoneNum").val(employeeList[selectedRow.id].phoneNum);
        }
    });

    

    // REMOVE THE CURRENTLY SELECTED EMPLOYEE FROM LIST AND REDISPLAY UPDATED LIST
    $("#deleteLink").click(function() {
        if (selectedRow == "") {
            alert("You must first select a row to delete");
        }
        else {
            // Delete the node using splice
            employeeList.splice(selectedRow.id,1);
            $("#viewLink").trigger('click');
        }
    });
    
    // CHANGE BACKGROUND COLOR OF SELECTED ROW AND SAVE THE SELETED ROW FOR USE WITH
    // THE DELETE/UPDATE LINK
    // THIS IS A SPECIAL CASE WHERE WE USED DELEGATION TO ASSIGN EVENTS TO A .empRow CLASS 
    // SO THAT THE EVENTS WILL TRIGGER FOR ROWS THAT ARE ADDED AFTER INITIAL PAGE LOAD
    $('#employeeDiv').on('click', '.empRow', function() {
        selectedRow = this;
        $('tr').css('background-color', 'white');
        $(this).css('background-color', 'yellow');
    });


    // Hide all divs
    function hideAll() {
        $("#employeeDiv, #addDiv, #updateDiv, #verifyDiv, #errorDiv").hide();
    }

    // ADD A NEW EMPLOYEE TO LIST BASED ON FORM INPUT THEN REDISPLAY UPDATED LIST
    $("#btnAdd").click(function () {
        let name = $("#name").val();
        let officeNum = $("#officeNum").val(); 
        let phoneNum = $("#phoneNum").val(); 
        employeeList.push({"name":name, "officeNum":officeNum, "phoneNum":phoneNum});
        hideAll();
        $("#updateDelete").show();
        showEmployeeData();
        $('#name').val("");
        $('#officeNum').val("");
        $('#phoneNum').val("");
    });

    // CHECK TO SEE IF EMPLOYEE EXISTS IN ARRAY
    $('#btnVerify').click(function() {
        let name = $("#searchForName").val();
    
        if(contains(employeeList, "name", name)) 
        {
            alert(name + " was found in array.");
        } 
        else 
        {
            alert(name + " was not found in array, Please check spelling.");
        }
        $("#viewLink").trigger('click');
    })

    // UPDATE THE EXISTING EMPLOYEE INFO FROM FORM INPUT
    $("#btnUpdate").click(function() {
        let name = $("#updatedName").val(); 
        let officeNum = $("#updatedOfficeNum").val(); 
        let phoneNum = $("#updatedPhoneNum").val(); 
        employeeList[selectedRow.id].name = $("#updatedName").val();
        employeeList[selectedRow.id].officeNum = $("#updatedOfficeNum").val();
        employeeList[selectedRow.id].phoneNum = $("#updatedPhoneNum").val();
        hideAll();
        $("#updateDelete").show();
        showEmployeeData();
    });


    // EMPTY THE EMPLOYEE LIST, FETCH THE UPDATED DATA AND REDISPLAY
    function showEmployeeData() {
        $("#tblEmployees").empty();
        let employees = getEmployeeData();
        $('#tblEmployees').append(employees);
        $("#employeeDiv").show();
    }


    // LOOP THROUGH THE EMOKIYEE LIST CREATING A NEW ROW IN THE TABLE FOR EACH EMPLOYEE
    function getEmployeeData() {
        let tr = "";
        for (var i in employeeList) {
            tr = tr + "<tr class='empRow' id='" + i + "'>" + 
                "<td>" + employeeList[i].name + "<br>" + 
                employeeList[i].officeNum + "<br>" + 
                employeeList[i].phoneNum + "<br><br>" +
                "</td></tr>"; 
        }
        return tr;
    }

    function contains(arr, key, val) {
        let retVal = false;
        try {
            for (var i = 0; i < arr.length; i++) {
                if(arr[i][key] === val) retVal = true;
            }
        } catch (e) {}
        return retVal;
    }
    
    function hideAllAndShow(divName) {
        $("#updateDelete").hide();
            hideAll();
            $(divName).show();
    }

    $('.numeric').on('input', function (event) { 
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    $('.phone').usPhoneFormat({
        format: 'xxx-xxx-xxxx',
    }) 

})

 