using UnityEngine;

public class Touch : MonoBehaviour
{
    [Tooltip("������ url")]
    public string url;
    private void OnMouseDown()
    {
        Application.OpenURL(url);
    }
}
