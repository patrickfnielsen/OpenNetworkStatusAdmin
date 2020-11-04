import dayjs from 'dayjs';

function formatDate(date) {
    if (date == null) {
        return "N/A"
        
    }
        
    return dayjs(date).format("DD/MM/YYYY HH:mm:ss UTC");
}

export default { formatDate }