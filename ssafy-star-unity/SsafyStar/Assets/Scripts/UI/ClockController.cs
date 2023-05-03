using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;
using System.Globalization;
using UnityEngine.UIElements;

public class ClockController : MonoBehaviour
{
    private CultureInfo culture;
    private DateTime date;

    private UIDocument doc;
    private Label labelTime;
    private Label labelTimeMarker;
    private Label labelDay;
    private Label labelWeekday;
    private Label labelMonth;

    private void Start()
    {
        culture = new CultureInfo("en-US");

        doc = GetComponent<UIDocument>();

        labelTime = doc.rootVisualElement.Q<Label>("Time");
        labelTimeMarker = doc.rootVisualElement.Q<Label>("TimeMarker");
        labelDay = doc.rootVisualElement.Q<Label>("Day");
        labelWeekday = doc.rootVisualElement.Q<Label>("WeekDay");
        labelMonth = doc.rootVisualElement.Q<Label>("Month");
    }
    private void LateUpdate()
    {
        labelWeekday.text = DateTime.Now.ToString("dddd", culture).Substring(0, 3);
        labelMonth.text = DateTime.Now.ToString("MMMM", culture).Substring(0, 3);
        labelDay.text = DateTime.Now.ToString("dd", culture);

        labelTime.text = DateTime.Now.ToString("hh:mm");
        labelTimeMarker.text = DateTime.Now.ToString("tt", culture);

    }
}
