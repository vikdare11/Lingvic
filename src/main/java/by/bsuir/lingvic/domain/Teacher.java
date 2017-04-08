package by.bsuir.lingvic.domain;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity(name = "teacher")
public class Teacher {

    @GenericGenerator(name = "generator", strategy = "foreign", parameters = @org.hibernate.annotations.Parameter
            (name = "property", value = "user"))
    @Id
    @Column(name = "user_id")
    @GeneratedValue(generator = "generator")
    private Long userId;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "education_info")
    private String educationInfo;

    @OneToOne(fetch = FetchType.LAZY)
    @PrimaryKeyJoinColumn
    private User user;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
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
