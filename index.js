
    // 獲取今天日期的字串 (格式: YYYY-MM-DD)
    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // 更新 WPS 列印文字
    function updateWpsPrintText() {
        const selectedWps = [];
        document.querySelectorAll('.wps-checkbox:checked').forEach(cb => {
            selectedWps.push(cb.value);
        });
        const other = document.getElementById('wpsOther').value.trim();
        if (other) selectedWps.push(other);
        
        document.getElementById('wpsPrintText').innerText = selectedWps.join('、');
    }

    // 初始化頁面
    window.onload = function() {
        loadData();
        updateWpsPrintText();
    };

    // 儲存資料到 LocalStorage
    function saveData() {
        // 獲取所有勾選的 WPS 選項
        const selectedWps = [];
        document.querySelectorAll('.wps-checkbox:checked').forEach(cb => {
            selectedWps.push(cb.value);
        });

        const data = {
            workDate: document.getElementById('workDate').value,
            baseType: document.getElementById('baseType').value,
            wpsOptions: selectedWps,
            wpsOther: document.getElementById('wpsOther').value,
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
            document.getElementById('workDate').value = getTodayDate();
            document.getElementById('baseType').value = 'PMSN/LUD';
            
            // 清空複選框
            document.querySelectorAll('.wps-checkbox').forEach(cb => cb.checked = false);
            document.getElementById('wpsOther').value = '';
            updateWpsPrintText();

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
        
        if (savedData) {
            const data = JSON.parse(savedData);
            document.getElementById('workDate').value = data.workDate || getTodayDate();
            document.getElementById('baseType').value = data.baseType || 'PMSN/LUD';
            
            // 載入複選框狀態
            if (data.wpsOptions) {
                document.querySelectorAll('.wps-checkbox').forEach(cb => {
                    cb.checked = data.wpsOptions.includes(cb.value);
                });
            }
            document.getElementById('wpsOther').value = data.wpsOther || '';
            updateWpsPrintText();

            document.getElementById('workContent').value = data.workContent || '';
            document.getElementById('location').value = data.location || '';
            document.getElementById('personnelCount').value = data.personnelCount || '';
            document.getElementById('remarks').value = data.remarks || '';
        } else {
            // 第一次進入，設定預設值
            document.getElementById('workDate').value = getTodayDate();
        }
    }