
    // 初始化頁面
    window.onload = function() {
        loadData();
    };

    // 儲存資料到 LocalStorage
    function saveData() {
        const data = {
            workDate: document.getElementById('workDate').value,
            baseType: document.getElementById('baseType').value,
            wps: document.getElementById('wps').value,
            workContent: document.getElementById('workContent').value,
            location: document.getElementById('location').value,
            personnelCount: document.getElementById('personnelCount').value,
            remarks: document.getElementById('remarks').value
        };

        localStorage.setItem('powerSignboardData', JSON.stringify(data));
        alert('內容已成功儲存！');
    }

    
    // 清空資料
    function clearData() {
        if (confirm('確定要清空所有內容嗎？這將會刪除已儲存的資料。')) {
            localStorage.removeItem('powerSignboardData');
            document.getElementById('workDate').value = '';
            document.getElementById('baseType').value = 'PMSN/LUD';
            document.getElementById('wps').value = '';
            document.getElementById('workContent').value = '';
            document.getElementById('location').value = '';
            document.getElementById('personnelCount').value = '';
            document.getElementById('remarks').value = '';
            alert('內容已清空！');
        }
    }


    // 從 LocalStorage 載入資料
    function loadData() {
        const savedData = localStorage.getItem('powerSignboardData');
        
        if (!savedData) return

            const data = JSON.parse(savedData);
            document.getElementById('workDate').value = data.workDate || '';
            document.getElementById('baseType').value = data.baseType || 'PMSN/LUD';
            document.getElementById('wps').value = data.wps || '';
            document.getElementById('workContent').value = data.workContent || '';
            document.getElementById('location').value = data.location || '';
            document.getElementById('personnelCount').value = data.personnelCount || '';
            document.getElementById('remarks').value = data.remarks || '';
        
    }