package by.bsuir.lingvic.domain;

import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.Entity;

@Entity(name = "student")
public class Student {

    @GenericGenerator(name = "generator", strategy = "foreign", parameters = @org.hibernate.annotations.Parameter
            (name = "property", value = "user"))
    @Id
    @Column(name = "user_id")
    @GeneratedValue(generator = "generator")
    private Long user_id;

    @Column(name = "full_name")
    private String fullName;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "student")
    private StudentCard studentCard;

    @Column(name = "group_number")
    private String groupNumber;

    @Column(name = "education_info")
    private String educationInfo;

    @OneToOne(fetch = FetchType.LAZY)
    @PrimaryKeyJoinColumn
    private User user;

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public StudentCard getStudentCard() {
        return studentCard;
    }

    public void setStudentCard(StudentCard studentCard) {
        this.studentCard = studentCard;
    }

    public String getGroupNumber() {
        return groupNumber;
    }

    public void setGroupNumber(String groupNumber) {
        this.groupNumber = groupNumber;
    }

    public String getEducationInfo() {
        return educationInfo;
    }

    public void setEducationInfo(String educationInfo) {
        this.educationInfo = educationInfo;
    }

    public User getUser() {
        return user;
   }

    public void setUser(User user) {
        this.user = user;
    }
}
